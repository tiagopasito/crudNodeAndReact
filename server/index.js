const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')                        //pra nao dar problema na conexao do front com o back

const db = mysql.createPool({
    host: 'localhost',
    user:'root',
    password: '1234',
    database: 'crudgames'
})

app.use(cors())
app.use(express.json())                             //pra poder ler os dados do crud (no front) tem que transformar em json

app.post("/register", (req, res) => {
    const { name } = req.body                       //igual a: const name = req.body.name
    const { cost } = req.body
    const { category } = req.body    

    let sql = "insert into games(name, cost, category) values (?, ?, ?)"

    db.query(sql, [name, cost, category], (err, result) => {
        console.log(err)
    })
})

app.get("/getCards", (req, res) => {
    
    let sql = "select * from games"

    db.query(sql, (err, result) => {
        if(err)
            console.log(err)
        else    
            res.send(result)
    })
})

app.listen(3001, () => {
    console.log('rodando servidor')
})