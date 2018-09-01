require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const app = express();
const dist = path.resolve('./build');
const mongoose = require('mongoose');
mongoose.connect(process.env.DB).then(() => console.log('Connected to mongoose'), e => console.log(e));

app.use(bodyParser.json(), express.static('build'));
routes(app);

app.get('*', function(req, res) {
  res.sendFile(path.join(dist, 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
