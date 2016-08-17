var mongoose = require('mongoose');

var ServiceProviderSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  dpsId: Number,
  services:  [
  {
  service_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Service'}
}
  ]
});

var ServiceProvider = mongoose.model('ServiceProvider', ServiceProviderSchema);
module.exports = ServiceProvider;