// Modulos externos
const inquirer = require('inquirer')
const chalk = require('chalk')

// Modulos internos
const fs = require('fs')

console.log('Iniciando o account')
operation()

function operation() {

    inquirer.prompt([
    {
        type: 'list',
        name: 'action',
        message: 'O que você deseja fazer',
        choices: [
            'Criar conta', 
            'Consultar Saldo', 
            'Depositar', 
            'Sacar', 
            'Sair'
        ]
    }
]).then((answer) => {

    const action = answer['action']
    // console.log(action)
    if(action === 'Criar conta'){
        createAccount()
    } else if(action === 'Consultar Saldo'){
        getAccountBalance()
    } else if(action === 'Depositar'){
        deposit()
    } else if(action === 'Sacar'){
        withdraw()
    } else if(action === 'Sair'){
        console.log(chalk.bgBlue.black('Obrigado por usar o Accounts!'))
        process.exit()
    }

}).catch(err => console.log(err))

}

// Create an account
function createAccount(){
    console.log(chalk.bgGreen.black('Parabéns por escolher nosso banco!'))
    console.log(chalk.green('Defina as opções da sua conta a seguir'))
    buildAccount()
    
}
function  buildAccount() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Digite um nome para sua conta'
        }
    ]).then((answer) => {
        // info "salva" alguns valores, então melhor usar o array para pegar o nome da conta
        const accountName = answer['accountName']
        console.info(accountName)

        if(!fs.existsSync('accounts')){
            fs.mkdirSync('accounts')
        }

        if(fs.existsSync(`accounts/${accountName}.json`)){
            console.log(chalk.bgRed.black('Esta conta já existe, escolha outro nome'))
            buildAccount()
            return
        }

        fs.writeFileSync(`accounts/${accountName}.json`, '{"balance" : 0}', (err) => {
            console.log(err)
        })

        console.log(chalk.green(`Parabéns, a conta ${accountName} foi criada!` ))
        operation()

    }).catch(err => console.log(err))
}

// add an amount to user account 
function deposit() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da sua conta?'
        }
    ]).then((answer) => {

        const accountName = answer['accountName']
        // verify if account exists
        if(!checkAccount(accountName)){
            return deposit()
        }

        inquirer.prompt([
            {
                name: 'amount',
                message: 'Quanto você deseja depositar?'
            }
        ]).then((answer) => {
        
            const amount = answer['amount']

            // add an amount
            addAmount(accountName, amount)

        }).catch(err => console.log(err))

    }).catch(err => console.log(err))
}

// show account balance
function getAccountBalance() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da sua conta?'
        }
    ]).then((answer) => {

        const accountName = answer['accountName']

        // verify if account exits
        if(!checkAccount(accountName)){
            return getAccountBalance()
        }

        const accountData = getAccount(accountName)
        console.log(chalk.bgBlue.black(`Olá, o saldo da sua conta é R$${accountData.balance}`))
        operation()

    }).catch(err => console.log(err))
}

// withdraw an amount from user account
function withdraw() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da sua conta?'
        }
    ]).then((answer) => {
        const accountName = answer['accountName']
        if(!checkAccount(accountName)){
           return withdraw()
        }

        inquirer.prompt([
            {
                name: 'amount',
                message: 'Quanto você deseja sacar?'
            }
        ]).then((answer) => {

            const amount = answer['amount']
            removeAmount(accountName, amount) 

        }).catch(err => console.log(err))

    }).catch(err => console.log(err))
}


// verify if account exists
function checkAccount(accountName){
    if(!fs.existsSync(`accounts/${accountName}.json`)){
        console.log(chalk.bgRed.black('Esta conta não existe, escolha outro nome'))
        return false
    }

    return true

}

// add an amount
function addAmount(accountName, amount) {

    const accountData = getAccount(accountName)
    // console.log(account)
    if(!amount){
        console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde'))
        return deposit()
    }

    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)
    fs.writeFileSync(
        `accounts/${accountName}.json`, 
        JSON.stringify(accountData),
        function (err) {
            console.log(err)
        }
    )

    console.log(chalk.green(`Foi depositado o valor de R$${amount} a sua conta!`))
    operation()
    
}

function getAccount(accountName){
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf8',
        flag: 'r'
        // r = ler
    })

    return JSON.parse(accountJSON)
}

function removeAmount(accountName, amount) {
    const accountData = getAccount(accountName)

    if(!amount){
        console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde'))
        return withdraw()
        // return -> Sair da função
    }

    if(accountData.balance < amount){
        console.log(chalk.bgRed.black('Valor indisponível!'))
        return withdraw()
    }

    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)
    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function (err) {
            console.log(err)
        }
    )
    console.log(chalk.green(`Foi realizado um saque de ${amount} na sua conta!`))
    operation()
}