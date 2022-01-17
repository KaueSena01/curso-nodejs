const express = require('express')
const exphbs = require('express-handlebars')
const { use } = require('express/lib/application')
const conn = require('./db/conn')

const app = express()

const User = require('./models/User')
const Address = require('./models/Address')

// Configurando o express para pegar dados via body
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine',  'handlebars')

app.use(express.static('public'))

app.get('/users/create', (req, res) => {
    res.render('adduser')
})

app.post('/users/create', async (req, res) => {
    const name = req.body.name
    const occupation = req.body.occupation
    let newsletter = req.body.newsletter

    if(newsletter === "on"){
        newsletter = true
    } else {
        newsletter = false
    }

    console.log(req.body)

    await User.create({name, occupation, newsletter})

    res.redirect('/')
})

app.get('/users/:id', async (req, res) => {
    const id = req.params.id

    const user = await User.findOne({raw: true, where: {id: id} })

    res.render('userview', {user})
})

app.post('/users/delete/:id', async (req, res) => {
    const id = req.params.id

    await User.destroy({where: {id: id} })

    res.redirect('/')

})

app.get('/users/edit/:id', async (req, res) => {
    const id = req.params.id

    try {
        const user = await User.findOne({include: Address, where: {id: id}})
    // plain: true -> Receber dados sem raw
    res.render('useredit', { user: user.get({ plain: true }) })
    } catch (error) {
        console.log(error)
    }
})

app.post('/users/update', async (req, res) => {
    const id = req.body.id
    const name = req.body.name
    const ocupation = req.body.occupation
    let newsletter = req.body.newsletter

    if(newsletter === "on"){
        newsletter = true
    }else {
        newsletter = false
    }

    const userData = {
        id: id,
        name: name,
        ocupation: ocupation,
        newsletter: newsletter
    }

    // console.log(userData.name)
    await User.update(userData, { where: {id: id} })

    res.redirect('/')

})

app.get('/', async (req, res) => {

    const users = await User.findAll({raw: true})
    // console.log(users)
    res.render('home', {users: users})
})

app.post('/address/create', async (req, res) => {
    const UserId = req.body.UserId
    const street = req.body.street
    const number = req.body.number
    const city = req.body.city

    const adress = {
        UserId, street, number, city
    }

    await Address.create(adress)

    res.redirect(`/users/edit/${UserId}`)

})

app.post('/address/delete', async (req, res) => {
    const UserId = req.body.UserId
    const id = req.body.id

    await Address.destroy({
        where: { id: id}
    })

    res.redirect(`/users/edit/${UserId}`)
})

conn
    .sync()
    // Remover e recriar a tabela
    // .sync({force: true})
    .then(() => {
        app.listen(8080)
}).catch((err) => console.log(err))
