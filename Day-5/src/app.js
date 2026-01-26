const express = require('express');

const app = express();
app.use(express.json());

const notes = [];

app.post('/notes',(req,res)=>{
    notes.push(req.body);
    // console.log(notes);
    
    res.status(201).json({message:'Note added successfully'});
})

app.get('/notes',(req,res)=>{
    res.status(200).json({
        notes:notes
    })
})

app.delete('/notes/:index',(req,res)=>{
    delete notes[req.params.index]

    res.status(200).json({message:'Note deleted successfully'});
})

app.patch('/notes/:index',(req,res)=>{
    notes[req.params.index].content = req.body.content
    res.status(200).json({message:'Note updated successfully'});
})

app.get('/', (req, res)=>{
    res.send('Hello world');
})

module.exports = app;