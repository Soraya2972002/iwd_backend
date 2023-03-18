# iwd_backend


Clone the repositery
cd iwd_backend/server
npm install, to install the dependencies
nodemon start / or node index.js

Documentation : 
This is the backend of our IWD project. 
I deployed it on Digital Ocean, the apis are then directly accessible from our flutter frontend project. 
The @ is 104.248.45.123:5000/api/v1 The architecture suits a random node project - controllers, routes, models and middlewares folders, and an index.js file. 
I have 5 different models. For each of them, I created multiples route and controllers - the usual CRUD applications, + some logic that depends on our application. 
Our application is a platform for helping jobless people to find work.
