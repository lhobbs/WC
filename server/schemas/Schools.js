var mongoose = require('mongoose');

var SchoolSchema = new mongoose.Schema({
  id: Number,
  description: String
});

var School = mongoose.model('School', SchoolSchema);
module.exports = School;

