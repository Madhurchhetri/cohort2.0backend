const express = require("express")
const noteModel = require("./models/notes.model")
const app = express()
app.use(express.json())

app.post('/notes', async(req,res)=>{
    const{title,content} = req.body;
    const note = await noteModel.create({
        title,content
    })
    
    res.status(201).json({
        message:"note created sucessfully",
        note
    })
})
module.exports = app