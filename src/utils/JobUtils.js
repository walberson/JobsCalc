module.exports={
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
        const dayDiff = Math.ceil(timeDiffInMs / dayInMs)
        // Retorno de dias restantes
        return dayDiff
    },
    calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
}