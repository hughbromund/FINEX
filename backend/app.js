const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');


const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.listen(port, () => console.log(`Example app listening on port ${port}!`));