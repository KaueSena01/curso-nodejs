const fs = require('fs')

// mkdir -> Cria o diretorio
if(!fs.existsSync('./minhapasta')){
    console.log("Não existe")
    fs.mkdirSync("minhapast")
    return
} else if(fs.existsSync('./minhapasta')){
    console.log("Existe")
}