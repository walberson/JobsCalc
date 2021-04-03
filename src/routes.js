const express = require('express');
const routes = express.Router()

/* convert direto o caminho especifico, porem com  "ejs" não é preciso o base path
 * pois ja reconhece automaticamente a views
 * const  = __dirname'/views'
*/
const views = __dirname + "/views/"
/*
 * Declarado o objeto profile para injeção do JS direto no html utilizando EJS exemplo utilizado no profile
 * Obs: quando utilizar o objeto se o nome conter um "-" devera colocar com aspas.
*/
const Profile = {
    data: {
        name: "Walberson Dias",
        avatar: "https://github.com/walberson.png",
        "monthly-budget": 3000,
        "days-per-week": 5,
        "hours-per-day": 5,
        "vacation-per-year": 4,
        "value-hour": 75
    },
    controllers:{
        index(req, res){
            return res.render(views + "profile", {profile:Profile.data})
        },
        update(req,res){
            //req.body para pegar Dados
            const data = req.body
            //definir quantas semanas tem num ano: 52
            const weeksPerYear = 52
            //remover as semanas de férias do ano, para pegar quantas semanas
            //tem em um mês
            const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12
            //quantas horas por semana estou trabalhando
            const weekTotalHours = data["hours-per-day"] * data["days-per-week"]
            //total de horas trabalhadas no mês
            const monthlyTotalHours = weekTotalHours * weeksPerMonth
            //qual será o valor da minha hora?
            const valueHours = data["monthly-budget"] / monthlyTotalHours
            Profile.data = {
                ...Profile.data,
                ...req.body,
                "value-hour":valueHours
            }
            return res.redirect('/profile')
        }
    }
//cria um array job que vai servir como estrutura de dados e receber informações do frontend
}


const Job = {
    data:[
        /*
        * Armazena dentro array jobs as informações do jobs.push da requisição do Body
        */ 
        {
            id:1,
            name:"Pizzaria Guloso",
            "daily-hours": 2,
            "total-hours": 47,
            created_at:Date.now(),
        },
        {
            id:2,
            name:"Pizzaria La Cremee",
            "daily-hours": 2,
            "total-hours": 1,
            created_at:Date.now(),
        }
    ],

    controllers:{
        /*
        * Como o req efetua a requisão do Body, é feita quando o tem o formulario linkado pelo
        * id do formulario exemplo da "job" identificador é "id=form-job" e o button tem que estar
        * com a tag "form=form-job" e o button deve do tipo "type=submit" para identificar a requisição
        */
        index(req,res){
            const updatedJobs = Job.data.map((job)=>{
            //análise no jobs
            const remaining = Job.services.remainingDays(job)
            const status = remaining <= 0 ? 'done':'progress' //if ternario efetuando em uma unica linha
                // Os "..." pega tudo dentro do obj e monta a estrutura com as informações 
                return {
                    ...job,
                    remaining,
                    status,
                    budget:Job.services.calculateBudget(job, Profile.data["value-hour"]) 
                }
            })
            return res.render(views + "index", {jobs: updatedJobs})
            
        },
        create(req,res){
            return res.render(views + "job")
        },
        save(req,res){
            /*
             * req.body = { name: 'LINA LAÇOS', 'daily-hours': '18', 'total-hours': '15' }
             * lastid vai no array jobs onde vai verificar o ultimo objeto adicionado se não 
             * constar o obejeto vai atribuir vai 1 
             * logical or operator
            */
            const lastId = Job.data[Job.data.length-1]?.id || 0;
            Job.data.push({
                id:lastId + 1,
                name:req.body.name,
                "daily-hours":req.body["daily-hours"],
                "total-hours":req.body["total-hours"],
                created_at:Date.now(), //atribuir data de hoje
                })
            return res.redirect('/')
        },
        show(req,res){
            const jobId = req.params.id
            const job= Job.data.find(job => Number(job.id) === Number(jobId))
            if(!job){
                return res.send('Job not found!')
            }
            
            job.budget = Job.services.calculateBudget(job, Profile.data["value-hour"])

            return res.render(views + "job-edit", {job})

        },
        update(req,res){
            const jobId = req.params.id
            const job= Job.data.find(job => Number(job.id) === Number(jobId))
            if(!job){
                return res.send('Job not found!')
            }
            const updatedJob = {
                ...job,
                name:req.body.name,
                "total-hours": req.body["total-hours"],
                "daily-hours": req.body["daily-hours"],
            }
            Job.data = Job.data.map(job=>{
                if (Number(job.id) === Number(jobId)){
                    job=updatedJob
                }
                return job
            })
            res.redirect('/job/'+ jobId)
        },
        delete(req,res){
            const jobId = req.params.id
            Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId))

            return res.redirect('/')    
        }
    },

    services:{
        remainingDays(job) {
            /*
            * Ajustes de calculo de tempo no job index
            * toFixed() responcreatel por arrendondar o valor, ex: 12,49 = 12
            */
            const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()
            const createdDate = new Date(job.created_at)
            //getDays = dias da semana getDate = dias do mês
            const dueDay = createdDate.getDate() + Number(remainingDays)
            const dueDateInMs = createdDate.setDate(dueDay)
            const timeDiffInMs = dueDateInMs - Date.now()
            //Transformar mile segundos em dias
            const dayInMs = 1000 * 60 * 60 * 24
            //Math.floor efetua o areedondamento para baixo diferente do toFixed()
            const dayDiff = Math.floor(timeDiffInMs / dayInMs)
            // Retorno de dias restantes
            return dayDiff
        },
        calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
    }
}

//res.render mudei para res.render
// require response - mudei para req res
// mudar --> routes.get('/', (req, res) => res.render(views + "/index.html"))
routes.get('/', Job.controllers.index )
routes.get('/job', Job.controllers.create)
routes.post('/job', Job.controllers.save)

routes.get('/job/:id', Job.controllers.show)
routes.post('/job/:id', Job.controllers.update)
routes.post('/job/delete/:id', Job.controllers.delete)
routes.get('/profile', Profile.controllers.index)
routes.post('/profile', Profile.controllers.update)




module.exports = routes;