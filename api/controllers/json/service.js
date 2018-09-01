const mongoose = require('mongoose');
const jsonSchema = require('../../../json-schema');
const json = mongoose.model('JSON', jsonSchema);
const shortid = require('shortid');

module.exports = {
  get(id) {
    return new Promise((res, rej) => {
      json.findOne({ id }, { _id: 0, id: 1, data: 1 }, (err, resp) => {
        if (err) rej(err);
        res(resp);
      });
    });
  },

  update(id, data) {
    return new Promise((res, rej) => {
      json.findOneAndUpdate({ id }, { data }, { new: true }, (err, resp) => {
        if (err) rej(err);
        console.log(resp);
        res(resp);
      });
    });
  },

  create(data) {
    const obj = new json({ id: shortid.generate(), data });
    return new Promise((res, rej) => {
      obj.save((err, resp) => {
        if (err) rej(err);
        const { id, data } = resp;
        res({ id, data });
      });
    });
  },
};
