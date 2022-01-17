const _ = require('lodash')
const chalk = require('chalk')

const a = [1, 2, 3, 4, 5]
const b = [5, 2, 4, 5, 6]

const diff = _.difference(a, b)

console.log(chalk.blue.bold(diff))