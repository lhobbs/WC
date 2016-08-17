var mongoose = require('mongoose');

var RequestSchema = new mongoose.Schema({
  id: Number,
  dpsid: Number,
  name: String,
  email: String,
  phone: String,
  role: {type: mongoose.Schema.Types.ObjectId, ref: 'Role'},
  school: {type: mongoose.Schema.Types.ObjectId, ref: 'School'},
  service: {type: mongoose.Schema.Types.ObjectId, ref: 'Service'},
  otherServiceDescription: String,
  serviceDate: Date
});

var Request = mongoose.model('Request', RequestSchema);
module.exports = Request;

