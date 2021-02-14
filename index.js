if(process.env.NODE_ENV !== 'production'){
    //require('dotenv').config() //no need of env
    DB_URL='mongodb://localhost/crio'
}
const express = require('express')
const mongoose = require('mongoose')
const fetch = require('node-fetch')
const Meme = require('./models/meme')
const methodOverride = require('method-override')
const bodyParser = require('body-parser');
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.raw({
    inflate: true,
    limit: '100kb',
    type: 'application/octet-stream'
  }))
app.use(methodOverride('_method'))

//Connecting to the Database

mongoose.connect(process.env.DB_URL || DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection 
db.on('error', error => console.log(error))
db.once('open', ()=> console.log('Connected to Mongoose'))

//Setting views

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.get('/', async(req, res) =>{
    try{
        const memes = await Meme.find({}).sort({createdAt: 'desc'}).limit(100)
        res.render('index', {memes: memes})
    } catch{
        res.redirect('/')
    }
    
})

//----------------------------------------------------------------------------//
//------------------------FOR CURL--------------------------------------------//
//----------------------------------------------------------------------------//

app.get('/memes', async(req, res) =>{
    try{
        const memes = await Meme.find({}).sort({createdAt: 'desc'}).limit(100)
        res.json(memes)
    } catch{
        res.redirect('/')
    }
    
})

app.get('/memes/:id', async(req, res) => {
    const meme = await Meme.findById(req.params.id)
    if(meme){
        res.json(meme)
    } else {
        res.status(404).send("404 Not Found")
    }
})


app.post('/memes', async(req, res) =>{
    let meme = new Meme()
    //meme.name = JSON.stringify(req.body).name
    meme.name = req.body.name
    meme.caption = req.body.caption
    meme.link = req.body.link
    await meme.save()
    res.json(meme._id)
    //res.json(req.body)
})

//----------------------------------------------------------------------------//
//----------------------------------------------------------------------------//

//Edit form
app.get('/edit/:id', async(req, res) => {
    const meme = await Meme.findById(req.params.id)
    res.render('edit', {meme : meme})
})

//Create New Meme Post
app.post('/', async(req, res) =>{
    let meme = new Meme()
    meme.name = req.body.name
    meme.caption = req.body.caption
    meme.link = req.body.link
    await meme.save()
    res.redirect('/')
})

//Delete a Meme
app.delete('/:id', async(req, res)=>{
    await Meme.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

//Edit Route for Existing Meme
app.put('/:id', async(req, res)=>{
    let meme = await Meme.findById(req.params.id)
    meme.name = req.body.name
    meme.caption = req.body.caption
    meme.link = req.body.link
    await meme.save()
    res.redirect('/')
})

app.listen(process.env.PORT || 8081)