if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express = require('express')
const mongoose = require('mongoose')
const fetch = require('node-fetch')
const Meme = require('./models/meme')
const methodOverride = require('method-override')
const app = express()

app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection 
db.on('error', error => console.log(error))
db.once('open', ()=> console.log('Connected to Mongoose'))

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

const c = 'https://hdqwalls.com/wallpapers/best-nature-image.jpg'

app.get('/', async(req, res) =>{
    try{
        const memes = await Meme.find({}).sort({createdAt: 'desc'}).limit(100)
        res.render('index', {memes: memes})
    } catch{
        res.redirect('/')
    }
    
})

app.post('/', async(req, res) =>{
    let meme = new Meme()
    meme.name = req.body.name
    meme.caption = req.body.caption
    meme.link = req.body.link
    await meme.save()
    res.redirect('/')
})

app.delete('/:id', async(req, res)=>{
    await Meme.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

app.get('/meme', async(req, res) => {
    res.render('meme', {c:c})
})

app.listen(process.env.PORT || 3000)