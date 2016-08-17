(function() {
 
  'use strict';
  var express = require('express');
  var router = express.Router();

 var db = require('mongoose');
 var Request = require('./../schemas/Requests');
 var School = require('./../schemas/Schools');
 var Service = require('./../schemas/Services');
 var Role = require('./../schemas/Roles');
 var ServiceProvider = require('./../schemas/ServiceProviders');
 var nodemailer = require ('nodemailer');

  db.connect('mongodb://localhost/wholechild');

var smtpConfig = {
  host: 'dpsmailout.dpsk12.org',
  port: 25
};
var transporter = nodemailer.createTransport(smtpConfig);


  /* GET home page. */
  router.get('/', function(req, res) {
    res.render('index');
  });
 
  router.get('/api/requests', function(req, res) {
    Request.find({}, function(err, data) {
      res.json(data);
    }).populate('role school service');
  });

  router.get('/api/requests/:id', function(req, res) {
    Request.findOne({ "_id": req.params.id}, function(err, data) {
      res.json(data);
    } )
    .populate('role school service');
  });
 
  router.post('/api/requests', function(req, res) {
    console.log('inside api');
    var request = new Request ({
          name: req.body.name,
          dpsid: req.body.dpsid,
          email: req.body.email,
          phone: req.body.phone,
          role: req.body.role._id,
          school: req.body.school._id,
          service: req.body.service._id,
          otherServiceDescription: req.body.otherServiceDescription,
          serviceDate: req.body.serviceDate
        });
    request.save(function(err) {
      if (!err) {
        return console.log('added');
      }
      else {
        return console.log('error :(');
      }
    });
    return res.send(request); 
  });
 
  router.get('/api/services', function(req, res) {
    Service.find({}, function(err, data) {
      res.json(data);
    });
  });

  router.get('/api/schools', function(req, res) {
    School.find({}, function(err, data) {
      res.json(data);
    });
  });

router.get('/api/roles', function(req, res) {
    Role.find({}, function(err, data) {
      res.json(data);
    });
  });

router.get('/api/serviceProviders', function(req, res) {
    ServiceProvider.find({}, function(err, data) {
      res.json(data);
    })
    .populate('services.service_id')
    .exec(function (err, service){
      if (err)  
        console.log(err);
      else {
          console.log(service);
      }
      });
  });

router.get('/api/serviceProviders/:id', function(req, res) {
        ServiceProvider.find(
        { "services": { "service_id" : req.params.id } } ,
        {"dpsid": 1, "_id": 0} 
      , function(err, data) {
      res.json(data);
      if (err)  
        console.log(err);
      else {
          // console.log(data);
      }
    } )
  });

router.get('/api/serviceProviderRequests/:id', function(req, res) {
    var services = [];
    ServiceProvider.find({
      "dpsid": req.params.id
    },
    {
      "services" : 1, "_id": 0
    }
      , function(err, data) {
      res.json(data);
      if (err)  
        console.log(err);
      else {
        services = data;
        console.log('services: ' + data);

        Request.find({
          "same" : { $setIntersection : ["services", services] }
        }
        , function(err, data2) {
          //res.json(data2);
          if (err)  
            console.log(err);
          else {
            // services = data;
            console.log('requests: ' + data2);
          }
        } );
      }
    } );
    
  });

router.get('/api/requesterRequests/:id', function(req, res) {
    Request.find({
      "dpsid": req.params.id
    }
      , function(err, data) {
      res.json(data);
      if (err)  
        console.log(err);
      else {
          // console.log(data);
      }
    } )
  });

router.post('/api/notification', function(req, res) {
  var mailData = {
    from: 'WholeChildMEAN@dpk12.org',
    to: 'lisa_hobbs@dpsk12.org',
    subject: 'Support Requested',
    text: req.body.message
};
  console.log(mailData);
  transporter.sendMail(mailData, function(error, info){
    console.log('done??');
    if (error){
        console.log(error);
        res.json({yo: 'error'});
    }
    else {
        console.log('Message sent: ' + info.response);
        res.json({yo: info.response});
    };
});
});
 
  module.exports = router;
 
}());