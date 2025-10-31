const {intializeDatabase} = require("./db/db.connect")
require("dotenv").config()
const Events = require("./models/events.models")
const express = require("express")
const app = express()
app.use(express.json())
intializeDatabase()
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hello, express server")
})


async function readAllEvents(){
  try{
    const allBooks = await Events.find()
    return(allBooks)
  }catch(error){
   throw error
  }
}

app.get("/events" , async (req , res) => {
  try{
    const events = await readAllEvents()
      if(events.length != 0){
        res.json(events)
      }else{
        res.status(404).json({error: "Events not found"})
      }
  }catch(error){
    res.status(500).json({error: "Failed to fetch Events.", error: error.message})
  }
})

async function readEventByTitle(eventTitle){
  try{
    const eventsByTitle = await Events.find({title: eventTitle})
    return(eventsByTitle)
  }catch(error){
    throw error
  }
}

app.get("/events/:title", async (req, res) => {
  try{
    const events = await readEventByTitle(req.params.title)
    if(events){
      res.json(events)
    }else{
      res.status(404).json({error: "Events not found."})
    }

  }catch(error){
    res.status(500).json({error: "Failed to get events."})
  }
})



async function readEventByMode(eventMode){
  try{
    const eventsByMode = await Events.find({mode: eventMode})
    return(eventsByMode)
  }catch(error){
    throw error
  }
}

app.get("/events/mode/:eventMode", async (req, res) => {
  try{
    const events = await readEventByMode(req.params.mode)
    if(events){
      res.json(events)
    }else{
      res.status(404).json({error: "Events not found."})
    }

  }catch(error){
    res.status(500).json({error: "Failed to get events."})
  }
})


async function readEventByTag(eventTag){
  try{
    const eventsByTag = await Events.find({tags: eventTag})
    return(eventsByTag)
  }catch(error){
    throw error
  }
}

app.get("/events/tags/:tags", async (req, res) => {
  try{
    const events = await readEventByTag(req.params.tags)
    if(events.length != 0){
      res.json(events)
    }else{
      res.status(404).json({error: "Events not found."})
    }

  }catch(error){
    res.status(500).json({error: "Failed to get events."})
  }
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log("Server is running on port", PORT)
})
