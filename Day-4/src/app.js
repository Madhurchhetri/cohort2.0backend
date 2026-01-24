// server ko create karna 
// server ko config karna

const express = require('express');

const app = express(); //server create ho jata hain 
app.use(express.json()); // middleware jo json data ko parse kar sake

const notes =[]

app.post('/notes',(req,res)=>{
    // console.log(req.body);
    notes.push(req.body);
    console.log(notes); 
    res.send("Note created");
})

app.get('/notes',(req,res)=>{
    res.json(notes);
})


app.delete('/notes/:index',(req,res)=>{
    delete notes[req.params.index];
    res.send("Note deleted successfull");
}) 

app.patch('/notes/:index',(req,res)=>{
    notes[req.params.index] = req.body.content;

    res.send("Note updated successfully");
})

app.get('/',(req,res)=>{
    res.send("Hello world");
})
module.exports = app;