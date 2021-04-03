const express = require("express")

const server = express()
//chama o arquivo routes e joga na const routes
const routes = require("./routes")

//Usar template Engine
server.set('view engine', 'ejs')


//habilitar arquivos estáticos (imagem etc)
server.use(express.static("public"))

//usar o req.body -- server.use - para habilitar coisas no servidor
server.use(express.urlencoded({extended: true}))

// routes
server.use(routes)
//criar o servidor na porte 3000
server.listen(3000, () => { console.log('rodandooo') })