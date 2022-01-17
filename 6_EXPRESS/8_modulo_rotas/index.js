const e = require('express')
const express = require('express')
const app = express()
const port = 3000 // variável ambiente

const path = require('path')

const usersRoutes = require('./users')

// ler o body
app.use(
    express.urlencoded({
        extended: true
    }),
)
app.use(express.json())

const basePath = path.join(__dirname, 'templates')

app.use('/users', usersRoutes)

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

// next()
app.listen(port, () => {
    console.log(`App rodando na porta: ${port}`)
})