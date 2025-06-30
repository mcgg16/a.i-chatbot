// Add dependencies 
const express = require("express"); // Gives access to express package
const cors = require("cors"); 
const bodyParser = require("body-parser");
const OpenAI = require("openai"); // Modern OpenAI import
const dotenv = require("dotenv"); // Add dotenv

dotenv.config(); 

const app = express(); 

app.use(cors()); // Will use the cors for middleware
app.use(bodyParser.json()); // Will recieve requests in json format

// Set up openAI with the new syntax
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
}); 

// Add routes, this one is basic GET
app.get("/", (req, res) => {
    res.send("Welcome to the AI Chatbot API!"); 
})

// Main route to connect to API with what it returns; must be async to wait for reponse
app.post("/message", async (req, res) => {

    const {prompt} = req.body; // Use destructor to get the body

    try {
        // Get the chat response
        const aiResponse = await openai.chat.completions.create({
            // Specify what model use
            model: process.env.OPENAI_MODEL,
            // Arr of mssgs bcs maybe need to tell the AI what it needs to act as or give context
            messages: [
                // Run only sending user role 
                {
                    role: "user", 
                    // Pass mssg that will be sent 
                    content: prompt
                }
            ]
        })

        // Get the AI response
        res.json({
                // Extract the result from possible answers, rn only taking first one and extracting the message it has
                //ai_response: aiResponse.data.choices[0].message
                
                // ai_response: aiResponse.choices[0].message.content // Works now w this 

                
                message: aiResponse.choices[0].message.content,
                role: aiResponse.choices[0].message.role,
            })
    } catch (error) {
        console.error(error); // Print out the error
    }

    
})

const PORT = process.env.PORT || 1330; // Will get por from env or default to 1330

// Will be listening for events on the port
app.listen(PORT, () =>  {
    console.log(`App is now running on port ${PORT}`)
})