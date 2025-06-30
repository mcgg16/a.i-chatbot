// Add dependencies 
const express = require("express"); // Gives access to express package
const cors = require("cors"); 
const bodyParser = require("body-parser");

const app = express(); 

app.use(cors()); // Will use the cors for middleware
app.use(bodyParser.json()); // Will recieve requests in json format

// Add routes, this one is basic GET
app.get("/", (req, res) => {
    res.send("Welcome to the AI Chatbot API!"); 
})

// Main route to connect to API with what it returns
app.post("/message", (req, res) => {
    res.json({
        ai_response: "How are you?"
    })
})

// Working with .env to give access to key 
//process.env.OPENAI_API_KEY

const PORT = process.env.PORT || 1330; // Will get por from env or default to 1330

// Will be listening for events on the port
app.listen(PORT, () =>  {
    console.log(`App is now running on port ${PORT}`)
})