const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) =>{
    res.status(200).json({ status: "ok", message: "Server Workiing"})
})

app.get('/users', (req, res) =>{
    const id = 10
    res.json({
        mensagem: "Buscando",
        id: 10
    })
    console.log(req.url)
})

const users = {}

app.post('/user', (req, res) => {

})

app.listen(port, () => {
    console.log(`App running and listen on port ${port}`)
})