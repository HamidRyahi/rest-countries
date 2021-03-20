const fetch = require("node-fetch");
var path = require('path')
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(express.static('dist'));
const port = 8081;
const server = app.listen(port, () => { console.log(`running on localhost: ${port}`) })


app.post("/rest", async (req, res) => {
  console.log('rest request body:', req.body)
  const country = req.body.country;
  let url = `https://restcountries.eu/rest/v2/name/${country}`;
  console.log('rest url:', url);
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/JSON",
    }
  });
  try {
    const data = await response.json();
    // console.log('data:', data);
    res.send({
      data: data[0]
    });
  } catch (err) {
    console.log("GN error", err);
  }
});
