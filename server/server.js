const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const PORT = 3000
const api = require('./routes/api')
const app=express()

app.use(cors());
app.use(bodyParser.json())

// app.use('/api',api)

// app.use(express.static('c:/users/bhupen/desktop/nishi'))

app.get('/', (req, res)=>
{
    // res.send('Hello from server');
    res.status(200).send({"ms":"From Data Server working...." });
})


app.listen(PORT,function()
{
    console.log("Server Start at localhost" + PORT)
})