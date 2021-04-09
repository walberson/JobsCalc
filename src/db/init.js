const Database = require('./config')

const initDb = {
    async init(){

    

//async / await
//async diz para o javascript esperar no await
//toda a vez que for se conectar com o db, tem que chmar aquela fun~ção open

//pega o sql e executa dentro do banco de dados
//await esperar a função terminar de fazer as atividades no banco de dados
//usa quando executar coisas externas que não são do javascript
const db = await Database()


await db.exec(`
    CREATE TABLE profile (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        avatar TEXT,
        monthly_budget INT,
        days_per_week INT,
        hours_per_day INT,
        vacation_per_year INT,
        value_hour INT
    )
`);

await db.exec(`
    CREATE TABLE jobs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        daily_hours INT,
        total_hours INT,
        created_at DATETIME
    )
`);

await db.run(`
    INSERT INTO profile(
        name,
        avatar,
        monthly_budget,
        days_per_week,
        hours_per_day,
        vacation_per_year,
        value_hour
    )
    VALUES (
        "jakeliny",
        "https://github.com/walberson.png",
        3000,
        5,
        5,
        4,
        70
    );
`)

await db.run(`
    INSERT INTO jobs(
        name,
        daily_hours,
        total_hours,
        created_at
    ) VALUES (
        "Pizzaria Guloso",
        2,
        1,
        1617900282730
    );
`)
await db.run(`
    INSERT INTO jobs(
        name,
        daily_hours,
        total_hours,
        created_at
    ) VALUES (
        "OneTwo Project",
        2,
        1,
        1617900282730
    );
`)


await db.close()
    }   
}

initDb.init()
/*

/*
INTEGER - INTEIRO
PRIMARY KEY - NUMERO IDENTIFICADOR CHAVE PRIMARIA (IGUAL CPF)
AUTOINCREMENT - o banco DECIDE QUAL NUMERO DO INT automaticamente - RESPONSÁVEL PELO NUMERO NÃO MUDAR
sql = comandos de banco de dados
só funciona dentro de banco de Dados
os comando são em maiúsculo
CREATE TABLE profile (
    name,
    avatar,
    monthly-budget,
    days-per-week
    hours-per-day,
    vacation-per-year,
    value-hour)
*/
