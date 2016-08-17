var mongoose = require('mongoose');

var RolesSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  id: Number,
  description: String
});

var Role = mongoose.model('Role', RolesSchema);
module.exports = Role;

