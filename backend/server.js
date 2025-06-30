// Add dependencies 
const express = require("express"); // Gives access to express package
const cors = require("cors"); 
const bodyParser = require("body-parser");

const app = express(); 

app.use(cors()); // Will use the cors for middleware
app.use(bodyParser.json()); // Will recieve requests in json format

const PORT = process.env.PORT || 1330; // Will get por from env or default to 1330

// Will be listening for events on the port
app.listen(PORT, () =>  {
    console.log(`App is now running on port ${PORT}`)
})