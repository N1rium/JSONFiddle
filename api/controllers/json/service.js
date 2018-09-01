const mongoose = require('mongoose');
const jsonSchema = require('../../../json-schema');
const json = mongoose.model('JSON', jsonSchema);

module.exports = {
  get(id) {
    return new Promise((res, rej) => {
      json.findOne({ id }, { _id: 0, id: 1, data: 1 }, (err, resp) => {
        if (err) rej(err);
        res(resp);
      });
    });
  },

  create(data) {
    const obj = new json({ id: new Date().getTime(), data });
    return new Promise((res, rej) => {
      obj.save((err, resp) => {
        if (err) rej(err);
        const { id, data } = resp;
        res({ id, data });
      });
    });
  },
};
