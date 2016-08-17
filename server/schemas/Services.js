var mongoose = require('mongoose');

var ServiceSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  id: Number,
  description: String
});

var Service = mongoose.model('Service', ServiceSchema);
module.exports = Service;
