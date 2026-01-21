const express = require('express');

const app = express(); // server create hua

app.get('/',(req,res)=>{
    res.send('Hello World!') // jab root URL pe request aayegi to ye message bhejega
})

app.get('/about',(req,res)=>{
    res.send('About Page') // jab /about URL pe request aayegi to ye message bhejega
})

app.get('/contact',(req,res)=>{
    res.send('this is contact page')
})
app.listen(3000) // server ko listen karaya port 3000 pe