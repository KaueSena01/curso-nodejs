const express = require('express')
const app = express()
const port = 3000 // variável ambiente

// req -> Recebe dados quando o usuário acessa
// res -> Envia dados pro usuário

app.get('/', (req, res) => {
    res.send('Olá mundo')
})

app.listen(port, () => {
    console.log(`App rodando na porta: ${port}`)
})