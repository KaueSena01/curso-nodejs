const fs = require("fs")

const arqName = "arquivo.txt"
const arqNewName = "nomeeditado.txt"

fs.rename(arqName, arqNewName, (err) => {
    if(err){
        // throw new Error("Arquivo não encontrado!")
        console.log(err)
        // return -> Sair do programa
        return
    }
    console.log(`Arquivo editado de ${arqName}! para ${arqNewName}`)
})