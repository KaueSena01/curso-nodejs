const express = require('express')
const app = express()
const port = 3000 // variável ambiente

const path = require('path')

const basePath = path.join(__dirname, 'templates')

app.get('/users/:id', (req, res) => {
    const id = req.params.id

    // Resgatando registros
    console.log(`Buscando pelo usurário: ${id}`)
    res.sendFile(`${basePath}/users.html`)
})

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

// next()
app.listen(port, () => {
    console.log(`App rodando na porta: ${port}`)
})