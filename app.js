const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

let jogos = []
let nextId = 1

app.get('/jogos', (req, res) => {
  res.json(jogos)
})

app.post('/jogos', (req, res) => {
  const { nome, tipo, nota, review } = req.body

  const novoJogo = {
    id: nextId++,
    nome,
    tipo,
    nota,
    review
  }

  jogos.push(novoJogo)
  res.status(201).json(novoJogo)
})

app.get('/', (req, res) =>{
    res.status(200).json({ status: "ok", message: "Server Workiing"})
    console.log(req.url)
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