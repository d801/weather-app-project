// Setup empty JS object to act as endpoint for all routes
projectData = [];


// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
/* Middleware*/
//body-parser as the middle ware to the express to handle HTTP POST
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder , this line allows talking between server and client side
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port , ()=>{console.log(`the server running on localhost: ${port}`);}); //the callback function


//const animalData = [];
app.get('/all' , getTheData)
function getTheData(req , res) {
	// body...
	res.send(projectData);
	console.log(projectData);
}


//POST function
app.post('/addData' ,addData);
function addData (req,res) {
	// body...
	newEntry = {
		temperature: req.body.temperature,
		date: req.body.date,
		fav: req.body.fav
	}
	
	projectData.push(newEntry)
	res.send(projectData)
	console.log(projectData)
}