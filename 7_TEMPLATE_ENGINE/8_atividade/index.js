const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

const hbs = exphbs.create({
    partialsDir: ['views/partials']
})


app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.static('public'))

const listProducts = [
    {
        id: 1,
        title: "Mouse",
        description: "Mouse gamer para jogos",
        qtd: 5
    },
    {
        id: 2,
        title: "PC",
        description: "PC gamer para jogos",
        qtd: 5
    },
    {   
        id: 3,
        title: "Cadeira",
        description: "Cadeira gamer para jogos",
        qtd: 5
    }
]

app.get('/product/:id', (req, res) => {
    const product = listProducts[parseInt(req.params.id) -1]

    res.render('product', {product})
})

app.get('/products', (req, res) => {
    res.render('listproducts', {listProducts})
})

app.get('/', (req, res) => {
    res.render('home')
})

app.listen(3000, () => {
    console.log('App funcionando!')
})