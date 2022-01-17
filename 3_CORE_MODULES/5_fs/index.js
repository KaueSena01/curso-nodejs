const http = require("http")
const fs = require("fs")

const port = 8000

const server = http.createServer((req, res) => {

    // O status e os dados vão depender do tipo da página

    fs.readFile('mensagem.html', function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        })
        res.write(data)
        return res.end()
    })

})

server.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`)
})