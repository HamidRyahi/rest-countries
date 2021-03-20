const generateButton = document.querySelector('#generate')
const countryInput = document.querySelector('#country')

const handleSubmit = (event) => {
	event.preventDefault()
    console.log(countryInput)
    const entredCountry = countryInput.value;
    console.log(entredCountry)

    getRest('http://localhost:8081/rest', { country: entredCountry })
}

const getRest = async (url = '', data = {}) => {
    console.log(url)
    console.log(data)
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const data = await response.json();
        console.log(data);
        updateUI(data);
        return data;
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}

const updateUI = (dt) => {
    const capitalP = document.querySelector('.capital')
    const currencyP = document.querySelector('.currency')
    const flag = document.querySelector('.flag')
    const region = document.querySelector('.region')
    flag.style.display = 'block'
    capitalP.innerHTML = `${dt.data.capital}`
    currencyP.innerHTML = `${dt.data.currencies[0].name}`
    flag.src = `${dt.data.flag}`
    region.innerHTML = `${dt.data.region}`
}

generateButton.addEventListener('click', handleSubmit)

export { handleSubmit }