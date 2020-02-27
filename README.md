#Restful API Using MongoDb And ExpressJs.

This is our project for using the Expressjs with Mongodb with the help of admin-mongo and postman(RestClient).

#What We are Using :- 
1.EpxressJs.
2.MongoDb.
3.Admin-Mongo.
4.PostMan(Rested)

The Following folders contains different modules for our api :-

#Config :- 
This Folder contain Json file for connections of our mongodb (db_url). 

#Controllers :-
This folder contain user_controller file for performing operations on our data.

eg:Add,Update etc. 

#Models :-
This folder contain the schema for include mongoose package.

eg :- Registration : - First_name , Last_name , Email , Password. 

#app.js

This file including all the modules require for our file.(express , body-parser , mongoose).

#Routes

1. /api/reg : It is use for registration including : First_name , Last_name , Password, Email.

2. /api/auth :- It is use for username and password authentication by using jwt.

3. /api/auth/login : When authentication is success.Its going redirect to the api.

4. /api/products : This contains multiple products data including product_name , Description,image_url.

5. /api/reviews : It contains review of each products in the database when productId is matched.

6. /api/error : It is used to check the correct routes in our database.This will redirect to error message in wrong routes.


# @Himanshu Rawat #








