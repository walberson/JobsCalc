const express = require("express")

const server = express()
//chama o arquivo routes e joga na const routes
const routes = require("./routes.jsx")

//Usar template Engine
server.set('view engine', 'ejs')


//habilitar arquivos estáticos (imagem etc)
server.use(express.static("public"))


// routes
server.use(routes)
//criar o servidor na porte 3000
server.listen(3000, () => { console.log('rodando') })