const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports ={
    /*
    * Como o req efetua a requisão do Body, é feita quando o tem o formulario linkado pelo
    * id do formulario exemplo da "job" identificador é "id=form-job" e o button tem que estar
    * com a tag "form=form-job" e o button deve do tipo "type=submit" para identificar a requisição
    */
    
    create(req,res){
        return res.render("job")
    },
    async save(req,res){
        /*
         * req.body = { name: 'LINA LAÇOS', 'daily-hours': '18', 'total-hours': '15' }
         * lastid vai no array jobs onde vai verificar o ultimo objeto adicionado se não 
         * constar o obejeto vai atribuir vai 1 
         * logical or operator
        */
        //const jobs = await Job.get();
        //const lastId = jobs[jobs.length-1]?.id || 0;
        await Job.create({
            //id:lastId + 1,
            name:req.body.name,
            "daily-hours":req.body["daily-hours"],
            "total-hours":req.body["total-hours"],
            created_at:Date.now(), //atribuir data de hoje
            })
        return res.redirect('/')
    },
    async show(req,res){
        const profile = await Profile.get();
        const jobs= await Job.get();
        const jobId = req.params.id
        const job= jobs.find(job => Number(job.id) === Number(jobId))
        if(!job){
            return res.send('Job not found!')
        }
        
        job.budget = JobUtils.calculateBudget(job, profile["value-hour"])

        return res.render("job-edit", {job})
    },
    async update(req,res){
        const jobId = req.params.id
        /*
        const jobs= await Job.get();

        const job= jobs.find(job => Number(job.id) === Number(jobId))
        if(!job){
            return res.send('Job not found!')
        }
        */
        const updatedJob = {
            //spread - espalhar dados
            //...job,
            name:req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"],
        }
        /*
        const newJobs = jobs.map(job=>{
            if (Number(job.id) === Number(jobId)){
                job = updatedJob
            }
            return job
        })
        */
        await Job.update(updatedJob, jobId)
        res.redirect('/job/'+ jobId)
    },
    async delete(req,res){
        const jobId = req.params.id

        await Job.delete(jobId)
        return res.redirect('/')    
    }
}