Method: POST

API endpoint: localhost:3000/addOne

Content-type: application/json

Sample input:

{"name": "Adagaga",
 "where": "kirkland CA 98034",
 "date": "2016-09-01 01:01:01",
 "email": "abcde@gmail.com1"
}

Sample output:

{
  "result": {
    "ok": 1,
    "n": 1
  },
  "ops": [
    {
      "name": "Adagaga",
      "where": "kirkland CA 98034",
      "date": "2016-09-01T08:01:01.000Z",
      "email": "abcde@gmail.com1",
      "_id": "57f996448a38cb0861fc4373"
    }
  ],
  "insertedCount": 1,
  "insertedIds": [
    "57f996448a38cb0861fc4373"
  ]
}