const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports ={
    async index(req,res){
        const jobs = await Job.get();
        const profile = await Profile.get();
        const statusCount = {
            progress:0,
            done:0,
            total:jobs.length
        }
        //total de horas por dia de cada job em progresso
        let jobTotalHours = 0
        const updatedJobs = jobs.map((job)=>{
            //análise no jobs
            const remaining = JobUtils.remainingDays(job)
            const status = remaining <= 0 ? 'done':'progress' //if ternario efetuando em uma unica linha
            // Os "..." pega tudo dentro do obj e monta a estrutura com as informações 
            //STATUS = DONE
            //SOMANDO A QUANTIDADE DE STATUS
            statusCount[status] +=1
            //total de horas por dia de cada job em progresso
            //if (status ==='progress'){
            //    jobTotalHours += Number(job["daily-hours"])
            //}
            //fazendo com ternario
            jobTotalHours = status == 'progress' ? jobTotalHours + Number(job['daily-hours']) : jobTotalHours
            return {
                ...job,
                remaining,
                status,
                budget:JobUtils.calculateBudget(job, profile["value-hour"]) 
            }
        })
        //quantidade de horas que quero trabalhar - (menos) qtd horas de cada job progress
        const freeHours = profile["hours-per-day"] - jobTotalHours;
        return res.render("index", {jobs: updatedJobs, profile:profile, statusCount:statusCount, freeHours:freeHours})
        
    }
}
