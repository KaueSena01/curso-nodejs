const path = require("path")

// path absoluto
console.log(path.resolve('teste.txt'))

// formar path
const minFolder = "relatorios"
const fileName = "sena.txt"

const finalPath = path.join('/', 'arquivos', minFolder, fileName)

console.log(finalPath)