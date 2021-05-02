const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()
const expressLayouts = require('express-ejs-layouts')

//connection to mongodb 
mongoose.connect('mongodb://localhost/blog', { 
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true 
})

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', error => console.log('Connected to Mongoose'))

app.use(methodOverride('_method'))
app.get('/', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc'})

    res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(process.env.PORT || 5000)