const express = require("express")
const exphbs = require("express-handlebars")

const app = express()

// partials
const hbs = exphbs.create({
    partialsDir: ['views/partials']
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/blog', (req, res) => {
    const posts = [
    {
        title: 'Aprender Node.js',
        category: 'JavaScript',
        body: 'Este artigo vai te ajudar a aprender node.js...',
        comments: 4,
    },
    {
        title: 'Aprender PHP',
        category: 'PHP',
        body: 'Este artigo vai te ajudar a aprender PHP...',
        comments: 4,
    },
    {
        title: 'Aprender Laravel',
        category: 'Laravel',
        body: 'Este artigo vai te ajudar a aprender Laravel...',
        comments: 4,
    }
]

    res.render('blog', {posts})
})

app.get('/post', (req, res) => {
    const post = {
        title: 'Aprender Node.js',
        category: 'JavaScript',
        body: 'Este artigo vai te ajudar a aprender node.js...',
        comments: 4,
    }

    res.render('blogpost', {post})
})

app.get('/dashboard', (req, res) => {

    const items = [
        "Item a", "Item b", "Item c"
    ]

    res.render('dashboard', {items})
})

app.get('/', (req, res) => {

    const user = {
        name: "Kaue",
        surname: 'Sena',
        age: 17
    }

    const palavra = 'teste'

    const auth = true

    const approved = false

    res.render('home', { user: user, palavra, auth, approved })
})

app.listen(3000, () => {
    console.log('App funcionando!')
})