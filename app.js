const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

let jogos = []
let nextId = 1

app.post('/login', (req, res) => {
    const { email, password } = req.body

    if (email === "usuario@esoft.com" && password === "Abc123") {
        res.status(200).json({ token: "550e8400-e29b-41d4-a716-446655440000" })
    } else {
        res.status(401).json({ erro: "Mandou errado paizao" })
    }
})

app.get('/jogos', (req, res) => {
    res.json(jogos)
})

app.post('/jogos', (req, res) => {
    const { nome, tipo, nota, review } = req.body

    if (!nome || !tipo || nota === undefined || !review) {
        return res.status(400).json({ erro: 'Campos obrigatórios: nome, tipo, nota, review' })
    }

    if (typeof nota !== 'number') {
        return res.status(400).json({ erro: 'O campo nota deve ser um número' })
    }

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

app.get('/jogos/:id', (req, res) => {

    const id_jogo = parseInt(req.params.id)
    const jogo = jogos.find(j => j.id === id_jogo)

    if (!jogo) {
        return res.status(404).json({ erro: "Tem esse jogo não paizão" })
    }

    res.status(200).json(jogo)
})

app.put('/jogos/:id', (req, res) => {

    const id_jogo = parseInt(req.params.id)
    const { nome, tipo, nota, review } = req.body

    const jogo = jogos.find(j => j.id === id_jogo)

    if (!jogo) {
        return res.status(404).json({ erro: 'Jogo não encontrado' })
    }

    if (!nome || !tipo || nota === undefined || !review) {
        return res.status(400).json({ erro: 'Campos obrigatórios: nome, tipo, nota, review' })
    }

    if (typeof nota !== 'number') {
        return res.status(400).json({ erro: 'O campo nota deve ser um número' })
    }

    jogo.nome = nome
    jogo.tipo = tipo
    jogo.nota = nota
    jogo.review = review

    res.status(200).json(jogo)

})

app.delete('/jogos/:id', (req, res) => {
    const id_jogo = parseInt(req.params.id)
    const index = jogos.findIndex(j => j.id === id_jogo)

    if (index === -1) {
        return res.status(404).json({ erro: 'Jogo não encontrado' })
    }
    jogos.splice(index, 1)
    res.status(204).send()
})



app.get('/', (req, res) => {
    res.status(200).json({ status: "ok", message: "Server tá up paizão" })
    console.log(req.url)
})


if (require.main === module) {
    app.listen(port, () => {
        console.log(`App running and listen on port ${port}`)
    })
}

module.exports = app