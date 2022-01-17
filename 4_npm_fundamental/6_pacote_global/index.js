// Com o lodash instalado de forma global, o comando node index.js não executara, pois o lodash necessita dos seus arquivos
// npm link lodash

const _ = require('lodash')

const arr = [1, 1, 2, 3, 4, 5, 5]

console.log(_.sortedUniq(arr))