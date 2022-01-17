const inquirer = require('inquirer')
const chalk = require('chalk')

inquirer.prompt([
{
    name: 'nome',
    message: 'Digite o seu nome:'
},
{
    name: 'idade',
    message: 'Digite a sua idade:'  
}
]).then((answers) => {

    if(!answers.nome || !answers.idade){
        throw new Error('Preencha todos os campos!')
    }
         
    console.log(chalk.bgYellow.black(`Seu nome é: ${answers.nome} e sua idade é: ${answers.idade}`))
}).catch((err) => {
    console.log(err)
})