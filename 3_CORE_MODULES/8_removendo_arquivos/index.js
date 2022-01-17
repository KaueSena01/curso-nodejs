const fs = require("fs")

// unlink -> Remover
fs.unlink('arquivo.txt', function(err) {
    // Evidenciando o erro
    if(err){
        console.log(err)
        return
    }

    console.log('Arquivo removido!')
})