function isInvalidDate(date) {
  // TODO: implement real logic check if the input date is valid. True if invalid, false otherwise
  return false;
}

function isInvalidLocation(where) {
  // TODO: implement real logic check if the input location is valid. True if invalid, false otherwise
  return false;
}

function isInvalidEmailAdr(email) {
  // TODO: implement real logic to check if the input email address is valid. True if invalid, false otherwise
  return false;
}

function isNull (obj) {
  if (!obj || obj === undefined || obj === null || obj === '')
    return true;
  return false;  
}

exports.isNull = isNull;

/*
 * From project specification, three elements should be compulsory: location, name and email. Date is optional.
 * If missing date, by default is current time.
 */
exports.getValidInput = function (meeting) {
  var result = meeting;
  if (isNull(meeting.date))
    result.date = new Date();
  else
    result.date = new Date(meeting.date);
  if (isInvalidDate(meeting.date) || isInvalidLocation(meeting.where) || isInvalidEmailAdr(meeting.email))
    return null;
  return result;  
}

exports.find = function (db, collectionname, query, callback) {
  var collection = db.collection(collectionname);
  collection.find(query, function(err, cursor) {
    if (err) {
      console.log("Have err when retrieving docs: " + err);
      callback(err, null);
    }
    cursor.toArray(callback);
  });
};

exports.findOne = function (db, collectionname, query, callback) {
  var collection = db.collection(collectionname);
  collection.findOne(query, function(err, doc) {
    if (err) {
      console.log("Have err when retrieving a doc: " + err);
      callback(err, null);
    }
    callback(null, doc);
  });
};


exports.insertOne = function (db, collectionname, meeting, callback) {
  var collection = db.collection(collectionname);
  collection.insert(meeting, function(err, result) {
    if (err) {
      console.log("Have err when inserting a doc: " + err);
      callback(err, null);
    }
    callback(null, result);
  });
};

exports.deleteOne = function (db, collectionname, meeting, callback) {
  var collection = db.collection(collectionname);
  collection.remove(meeting, function(err, numOfRemovedItems) {
    if (err) {
      console.log("Have err when deleting a doc: " + err);
      callback(err, null);
    }
    callback(null, numOfRemovedItems);
  });
};

exports.updateDate = function (db, collectionname, newMeeting, callback) {
  var selector = {
  	 name: newMeeting.name,
  	 where: newMeeting.where,
  	 name: newMeeting.name
  };
  var collection = db.collection(collectionname);
  collection.update(selector, {$set: {date: newMeeting.date}}, function(err, result) {
    if (err) {
      console.log("Have err when updating a doc: " + err);
      callback(err, null);
    }
    callback(null, result);
  });
};

exports.openDB = function (db, callback) {
  db.open(function(err, dbInstance) {
    console.log("Mongo db is now open!");    
    callback(err, dbInstance);  
  });
};

exports.closeDB = function (db, callback) {
  console.log("Mongo db is now closed!");
  db.close();
  callback(null, null);
};