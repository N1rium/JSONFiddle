require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const dist = path.resolve('./build');

app.use(express.static('build'))

app.get('*',function (req, res) {
  res.sendFile(path.join(dist, 'index.html'));
});

const port = process.env.PORT || 3000;
process.env.GA_KEY && console.log(`Analytics key ${process.env.GA_KEY} found!`)
app.listen(port, () => console.log(`Example app listening on port ${port}!`));