const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
app.use(express.json());
app.use(express.static("./public"))
app.use(cors());
const noteModel = require('./Models/note.model')

// Create a new note and save it to the database

app.post('/api/notes', async (req, res) => {
    const { title , description } = req.body;
    const note= await noteModel.create({title, description})
    res.status(201).json({
        message: 'Note created successfully',
        note
    });
})

// Get all notes from the database send as response

app.get('/api/notes', async (req, res) => {
    const notes = await noteModel.find();
    res.status(200).json({
        message: 'Notes fetched successfully',
        notes
    })
})

// Delete a note by ID , delete note id from req.params

app.delete('/api/notes/:id', async (req, res) => {
    const { id } = req.params;
    await noteModel.findByIdAndDelete(id);
    res.status(200).json({
        message: 'Note deleted successfully'
    })
})

// Update a note by ID , update note id from req.params update description from req.body
app.patch('/api/notes/:id', async (req, res) => {
    const { id } = req.params;
    const { description } = req.body;
    const note = await noteModel.findByIdAndUpdate(id, { description });
    res.status(200).json({
        message: 'Note updated successfully',
    })
})

app.use("*name",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","public/index.html"))
})

module.exports = app;