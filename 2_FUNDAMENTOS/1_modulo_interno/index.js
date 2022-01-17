// ./ -> Modulo interno
// sem o ./ o node acha que é um core module

const meuModulo = require('./meu_modulo')

const soma = meuModulo.soma

soma(2, 3)
soma(5, 10)

// ou

meuModulo.soma(5, 10)