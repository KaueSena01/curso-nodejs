const chalk = require('chalk')

const nota = 6

if(nota >= 7){
    console.log(chalk.green.bold('Parabéns, você tirou: ' + nota))
}else{
    console.log(chalk.bgRed.yellow(':( Sua nota não foi uma das melhores: ' + nota))
}

