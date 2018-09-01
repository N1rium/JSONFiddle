const mongoose = require('mongoose');
module.exports = mongoose.Schema({
  id: { type: String, trim: true },
  data: {
    type: String,
    get: function(data) {
      try {
        return JSON.parse(data);
      } catch (e) {
        return data;
      }
    },
    set: function(data) {
      return JSON.stringify(data);
    },
  },
});
