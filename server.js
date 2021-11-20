/**
 * # To Create Project: npm init
 * and Enter the project related data
 * 
 * OR npm init -y
 * to Skip Data Entering Process
 *  
 * # To Start Server: node index
 * 
 * # To Install Any Package: npm install PACKAGE_NAME i.e. npm install express
 * OR npm i PACKAGE_NAME i.e. npm i express
 * 
 * #. To Start Server with Auto Restart on Changes: npm run dev
 * where 'dev' is script name which is defined under 'scripts' in 'package.json' file.
 * 
 * To Install 'nodeom': npm install -D nodemon
 * where '-D' means package will install for development mode only.
 * 
 * # To Install EJS (Template Engine): npm i ejs
 */ 

// Import Modules
const express = require('express')
const app = express()

// Database Setup
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId

// Database Constants
const DB_USER = "sarangalUser"
const DB_PASSWORD = "sarangalUser"
const DB_CONNECTION = `mongodb://${DB_USER}:${DB_PASSWORD}@localhost:27017/sarangal`

// To receive BODY Request Parameters as JSON
app.use(express.json())

// Mongodb Database Component
let db;

// One Way to Connect with Database
/* MongoClient.connect(DB_CONNECTION, function (err, client) {
  if (err) throw err
  db = client.db('sarangal')
}) */

// Another Way to Connection with Database
(async function(){
    try {
        const client = await MongoClient.connect(DB_CONNECTION)
        db = client.db('sarangal')
    } catch (error){
        throw error
    }
})();

// Initializations

// One Way to handle route
/* app.get("/", (request, response) => {

    // In shell: db.products.find()
    db.collection('users').find().toArray(function (err, result) {
        if (err) throw err

        response.send(result)
      })
}) */

// Another Way to handle route
app.get("/users", async (request, response) => {

    try {
        const result = await db.collection('users').find().toArray()
        response.send(result)
    } catch (error){
        throw error
    }
})

// Route to Fine One Documents in One Time
app.get("/user/:objectId", async (request, response) => {

    let documentId = request.params.objectId

    try {
        const result = await db.collection('users').findOne({
            _id: ObjectId(documentId)
        })
        response.send(result)
    } catch (error){
        throw error
    }
})


// Route to Search Document(s)
app.get("/users/search/:keyword", async (request, response) => {

    let searchKeyword = request.params.keyword

    try {
        const result = await db.collection('users').find(
                {"name" : new RegExp('.*' + searchKeyword + '.*')}
            ).toArray()
        response.send(result)
    } catch (error){
        throw error
    }
})

// Route to Insert One Documents in One Time
app.post("/user", async (request, response) => {

    try {
        const result = await db.collection('users').insertOne(request.body)
        response.send(result)
    } catch (error){
        throw error
    }
})

// Route to Insert Many Documents in One Time
app.post("/users", async (request, response) => {

    try {
        const result = await db.collection('users').insertMany(request.body)
        response.send(result)
    } catch (error){
        throw error
    }
})

// Configure PORT
const PORT = process.env.PORT || 3000

// Listen App
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})