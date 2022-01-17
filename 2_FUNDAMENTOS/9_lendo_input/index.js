const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
})

readline.question("Qual a sua linguagem preferida? ", (linguagem) => {
    console.log(`A minha linguagem preferida é ${linguagem}`)
    readline.close()
})