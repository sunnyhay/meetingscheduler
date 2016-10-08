const ab = require('asyncblock');
const bodyParser = require('body-parser');
const Db = require('mongodb').Db;
const express = require('express');

const utils = require('./utils');

const app = express();
const Server = require('mongodb').Server;
const db = new Db('test', new Server('localhost', 27017));


const collectionName = "meetings";

// config JSON parser
var jsonParser = bodyParser.json();

app.get('/', function (req, res) {
  res.send('Welcome to the meeting schedule system for No Sad Panda Initiative!');
});

app.get('/listAll', function(req, res) {
  console.log("now list all the meetings!");
  ab(function(flow) {
    var dbInstance = flow.sync(utils.openDB(db, flow.callback()));
    var docs = flow.sync(utils.find(dbInstance, collectionName, {}, flow.callback()));      
    flow.sync(utils.closeDB(db, flow.callback()));
    res.send(docs);
  });  	
});

app.post('/searchByDates', jsonParser, function(req, res) {
  var query = req.body;
  var selector = {
  	 date: {
      $gte: new Date(query.start),
      $lt: new Date(query.end)  	 
  	 }
  };
  console.log("now search the list of meetings by date range!");
  ab(function(flow) {
    var dbInstance = flow.sync(utils.openDB(db, flow.callback()));
    var docs = flow.sync(utils.find(dbInstance, collectionName, selector, flow.callback()));      
    flow.sync(utils.closeDB(db, flow.callback()));
    res.send(docs);
  });  	
});


app.post('/addOne', jsonParser, function(req, res) {
  var meeting = req.body;
  if (utils.isNull(meeting) || utils.isNull(meeting.name) || utils.isNull(meeting.email) 
    || utils.isNull(meeting.where)) {
    console.log("invalid request for adding a new meeting!");
    res.send("please provide valid request to add a new meeting");
    return;
  }
  
  meeting = utils.getValidInput(meeting);
  if(meeting === null) {
    console.log("invalid request for adding a new meeting!");
    res.send("please provide valid request to add a new meeting");  
    return;
  }
    
  console.log("begin to add a new meeting!");
  ab(function(flow) {
    var dbInstance = flow.sync(utils.openDB(db, flow.callback()));
    var result = flow.sync(utils.insertOne(dbInstance, collectionName, meeting, flow.callback()));      
    flow.sync(utils.closeDB(db, flow.callback()));
    res.send(result);
  });
});

app.put('/updateDate', jsonParser, function(req, res) {
  var meeting = req.body;
  if (utils.isNull(meeting) || utils.isNull(meeting.name) || utils.isNull(meeting.email) 
    || utils.isNull(meeting.where)) {
    console.log("invalid request for updating a meeting!");
    res.send("please provide valid request to update a meeting");
    return;
  }
  
  meeting = utils.getValidInput(meeting);
  if(meeting === null) {
    console.log("invalid request for updating a meeting!");
    res.send("please provide valid request to update a meeting");  
    return;
  }  
  
  console.log("begin to update an existing meeting!");
  ab(function(flow) {
    var dbInstance = flow.sync(utils.openDB(db, flow.callback()));
    var result = flow.sync(utils.findOne(dbInstance, collectionName, meeting, flow.callback()));
    result = flow.sync(utils.updateDate(dbInstance, collectionName, meeting, flow.callback()));
    flow.sync(utils.closeDB(db, flow.callback()));
    res.send(result);
  });
});

app.delete('/deleteOne', jsonParser, function(req, res) {
  var meeting = req.body;
  if (utils.isNull(meeting) || utils.isNull(meeting.name) || utils.isNull(meeting.email) 
    || utils.isNull(meeting.where) || utils.isNull(meeting.date)) {
    console.log("invalid request for deleting a meeting!");
    res.send("please provide valid request to delete a meeting");
    return;
  }
  
  meeting = utils.getValidInput(meeting);
  if(meeting === null) {
    console.log("invalid request for deleting a meeting!");
    res.send("please provide valid request to delete a meeting");  
    return;
  }  
  
  console.log("begin to delete a meeting!");
  ab(function(flow) {
    var dbInstance = flow.sync(utils.openDB(db, flow.callback()));
    var result = flow.sync(utils.findOne(dbInstance, collectionName, meeting, flow.callback()));
    if (result === null) {
      console.log("not find the meeting to be deleted!");
      flow.sync(utils.closeDB(db, flow.callback()));
      res.send("please provide an existing meeting to be deleted!");
      return;    
    }
    result = flow.sync(utils.deleteOne(dbInstance, collectionName, meeting, flow.callback()));
    console.log("the result of deletion: " + result);
    flow.sync(utils.closeDB(db, flow.callback()));
    res.send("Delete a doc");
  });
});

app.listen(3000, function () {
  console.log('Meeting scheduler is now listening on port 3000!');
});
