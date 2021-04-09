const sqlite3 = require('sqlite3')
const { open } = require('sqlite')
//quando chamar o open voce abre abre a conexao com o banco de dados

module.exports = ()=>
    //open só funciona dentro de uma função
    open({
        filename: './database.sqlite',
        //driver trabalha e guarda no filename
        driver: sqlite3.Database
    });



