# meetingscheduler

Contents

1. Preconditions to run the server

  MongoDB 3.2 is used to store meeting records using the default 27017 port.

  A Node module 'asyncblock' is used for flow control. Installation of g++ is the precondition for this module.

  Start the server by 'node app'.

2. API specs

  See details in /apidoc
  
3. Others

  (0) searchByDates API

  This is another API to list a number of meetings. I understand TimeZone as a time stamp range to select qualifable
  meetings.  
  
  (1) Model schema

  I do not apply any model schema on Mongo collection. Loosely structured data such as location is good for the
  toy project. But in prod environment I definitely prefer model schema to just simple JSON objects in Mongo. Any
  validation makes sense accordingly.  
  
  (2) Update and Delete

  Although Mongo provides more convenient update and delete methods (findAndModify and findAndRemove) for a single
  step operation which is atomic, transactional, for our case we may find multiple duplicate records since no strict
  update (or delete) criteria are defined. So my choice is two-step operation: first find one (from a few) document
  and then update. Deletion is applied for unique document.
  
  (3) Logging

  Console log should be replaced by such formal logging mechanism such as log4js. 
  
  (4) Unit test

  I ignore unit test this time since smoke test is good. Using mocha for test cases just needs to simulate Mongo
  operations and verify the result of invocation of these APIs.
  
  (5) Hard code and configurable

  This time hard coded some constants such as Mongod instance (localhost and default port) as well as collection
  name (meetings). Yet every such constant should be defined in configuraton files to enable flexible modification.
  
  (6) Express router

  I directly utilize different routes in the main source file (app.js) although in prod environment I will sure
  map each API upon different routes which are defined in app.js but implemented in various files under /routes.
  
  (7) Validation

  I add some TODO comments in validation methods since some of these fields such as email can be validated.  
  
  (8) Build

  In prod environment I'm used to applying gulp module to enable 'npm start'. For this toy project directly running
  app.js is good enough.
  
  (9) Type in JS

  TypeScript (now 2.0) is absolutely a better choice than naive JS since it provides strictly defined date types
  which usually cause tons of trouble in JS when the project evloves increasingly.
  
  (10) Key choice

  Since it's not clear to see which field(s) is good for collection key, I use the default ObjectId. 
  
  (11) Error handling
  
  Asyncblock error handling is ignored. In prod-level code this part can never be ignored. Refer to 
  https://github.com/scriby/asyncblock/blob/master/docs/errors.md for details.


 