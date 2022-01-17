const http = require("http")
const fs = require("fs")
const url = require("url")

const port = 8000

const server = http.createServer((req, res) => {
    const urlInfo = url.parse(req.url, true)
    const name = urlInfo.query.name

    if(!name){
        fs.readFile('index.html', function (err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(data)
            return res.end()
        })
    }else{

        // Adicionando outros usuários no arquivo
        const nameNewLine = name + '\r\n'
        // 302 status -> redirecionamento
        // appendFile -> Adicionar sem sobeescrever
        fs.appendFile("arquivo.txt", nameNewLine, function (err, data) {
            res.writeHead(302, {
                Location: '/'
            })
        return res.end()
        })
    }
})

server.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`)
})