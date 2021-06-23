import express from "express"
import hbs from "hbs"
import path from "path"
import mongoose from 'mongoose'
import methodOverride from 'method-override'
import { Comment} from "./models/comment.js";

const __dirname = path.resolve()
const app = express()

app.set('view engine', 'hbs')
hbs.registerPartials(path.join(__dirname, 'views/partials'))
hbs.registerHelper('formatTime', function (date) {
    return date.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    })
})

app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

await mongoose.connect('mongodb://localhost/mcs', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});


app.get('/', (req, res) => {
    res.render('index', {company: 'MCS', main_title:'Index'})
})

app.get('/comments', (req, res) => {
    Comment.find().then((comments) => {
        res.render('comments/index', {main_title:'Comments', comments: comments})
    }).catch((error) => {
        res.status(400).json({
            error:error
        })
    })
})

app.get('/comments/:id', (req, res) => {
    Comment.findOne({_id: req.params.id}).then((comment) => {
        res.render('comments/show', {main_title: comment.title, comment: comment})
    }).catch((error) => {
        res.status(400).json({
            error:error
        })
    })
})

app.put('/comments/:id', (req, res) => {
    const comment = new Comment({
        _id: req.params.id,
        title: req.body["comment_title"],
        body: req.body["comment_body"]
    })
    Comment.updateOne({_id: req.params.id}, comment).then(() => {
        res.redirect('/comments')
    }).catch((error) => {
        res.status(400).json({
            error:error
        })
    })
})

app.delete('/comments/:id', (req, res) => {
    Comment.deleteOne({_id: req.params.id}).then(() => {
        res.redirect('/comments/')
    }).catch((error) => {
        res.status(400).json({
            error:error
        })
    })
})

app.post('/comments', (req, res) => {
    const comment = new Comment({
        title: req.body["comment_title"],
        body: req.body["comment_body"],
        date: new Date()
    })
    comment.save().then(() => {
        res.redirect('/comments')
    }).catch((error) => {
        res.status(400).json({
            error:error
        })
    })
})

app.get('/about', (req, res) => {
    res.render('about', {main_title:'About Us'})
})

const users = [
    {
        id:1,
        name: 'Kevin',
        surname: 'Mitnick',
        description: 'A hacker!'
    },
    {
        id: 2,
        name: 'Bill',
        surname: 'Gates',
        description: 'Ex MS CEO',
        age: 55
    }
]

app.get('/users', (req, res) => {
    res.render('users', {main_title:'Users', users: users})
})

app.get('/users/:user_id', (req, res) => {
    const user = users.find(({id}) => id === parseInt(req.params["user_id"], 10))
    res.render('user', {main_title: user.name, user: user})
})


app.listen(3000, () => {
    console.log('Express web app on localhost:3000')
})

