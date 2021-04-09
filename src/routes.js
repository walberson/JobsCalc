const express = require('express');
const routes = express.Router()
const ProfileController = require('./controllers/ProfileController')
const JobController = require('./controllers/JobController')
const DashboardController = require('./controllers/DashboardController')
/* convert direto o caminho especifico, porem com  "ejs" não é preciso o base path
 * pois ja reconhece automaticamente a views
 * const  = __dirname'/views'
*/

/*
 * Declarado o objeto profile para injeção do JS direto no html utilizando EJS exemplo utilizado no profile
 * Obs: quando utilizar o objeto se o nome conter um "-" devera colocar com aspas.
*/

//res.render mudei para res.render
// require response - mudei para req res
// mudar --> routes.get('/', (req, res) => res.render(views + "/index.html"))
routes.get('/', DashboardController.index )
routes.get('/job', JobController.create)
routes.post('/job', JobController.save)
routes.get('/job/:id', JobController.show)
routes.post('/job/:id', JobController.update)
routes.post('/job/delete/:id', JobController.delete)
routes.get('/profile', ProfileController.index)
routes.post('/profile', ProfileController.update)




module.exports = routes;