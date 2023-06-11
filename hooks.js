 var hooks = require('hooks');
const axios = require( "axios");


 const baseURL= 'https://petstore.swagger.io/v2';



var responseStash = {};

const petBody = {
  "id": 0,
  "category": {
    "id": 1,
    "name": "canine"
  },
  "name": "doggie",
  "photoUrls": [
    ""
  ],
  "tags": [
    {
      "id": 1,
      "name": "shaggy"
    }
  ],
  "status": "available"
}
const orderBody = {
  "id": 1,
  "petId": 0,
  "quantity": 0,
  "shipDate": "2023-06-11T19:49:17.930Z",
  "status": "placed",
  "complete": true
}

const userList = [{
  
    "id": 0,
    "username": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "password": "string",
    "phone": "string",
    "userStatus": 0
  }
]

hooks.beforeAll(function (done) {
  hooks.log('before all');
  axios.post(baseURL+'/user/createWithArray',userList) .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });

  axios.post(baseURL+'/pet', petBody)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });

  axios.post(baseURL+'/store/order', orderBody)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
  
});


  hooks.before('/pet/{petId} > GET > 200', (transaction, done) => {
    hooks.log('before IS HERE:  ' + transaction.fullPath);
   const petId=1
  transaction.fullPath = transaction.fullPath.replace('{petId}', petId);
  transaction.request.uri = transaction.fullPath
  
  done();
});

hooks.before('/store/order/{orderId} > POST', function (transaction,done) {
  transaction.fullPath = transaction.fullPath.replace('{orderId}', stash.id);
  transaction.request.uri = transaction.fullPath;
  done();
});

hooks.after('/store/order > POST > 200', function (transaction,done) {
  stash.id = JSON.parse(transaction.real.body).id;
  hooks.log('before IS HERE:  ' + stash.id);
  done();
});