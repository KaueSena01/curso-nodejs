// ler argumentos, -> nome

console.log(process.argv)

// [
// índice 1[0]    'C:\\Program Files\\nodejs\\node.exe',
// índice 2[1]    'C:\\Users\\Kauealvessena\\Desktop\\nodejs-curso\\2_FUNDAMENTOS\\4_ler_argumentos\\index.js',
// índice 3[2]    'nome=Sena'
// ]

// Selecionando o terceiro elemento(índice 3[2])

const args = process.argv.slice(2)

console.log(args)

// node ./index.js nome=Sena

// pegando o nome
// args[0]
// Pegando o primeiro valor a ser passado

const nome = args[0].split('=')[1]

console.log(nome)

const idade = args[1].split('=')[1]

console.log(idade)

console.log(`Nome: ${nome} e Idade: ${idade}`)