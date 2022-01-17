// const x = "10" -> é uma string
const x = 10 // é um inteiro

// Checar se x é um número

if(!Number.isInteger(x)){
    throw new Error("O valor de x não é um número inteiro!")
}

console.log('Seguindo o projeto')