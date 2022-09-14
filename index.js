// const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

const PORT = 3001
// sin expres
// const app = http.createServer((res, req) => {
//   req.writeHeade(200, {'Content-Type': 'text/plan'})
//   req.end('hola world')
// })

let notes = [
  {
    id: 1,
    content: 'Media tarde x3',
    date: '2019-05-30T17:30:31.098Z',
    stock: true
  },
  {
    id: 2,
    content: 'Desfile',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'Polvorita',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  }
]
app.get('/', (req, res) => {
  res.send('<h1>HELLO WORLD</h1>')
})

app.get('/api/products', (req, res) => {
  res.json(notes)
})

app.get('/api/product/:id', (req, res) => {
  const id = Number(req.params.id)
  const porduct = notes.filter(item => item.id !== id)
  console.log('🚀 ~ file: index.js ~ line 43 ~ app.get ~ porduct', porduct)

  if (porduct) {
    res.json(porduct)
  } else {
    res.status(404).end()
  }
})
app.delete('/api/product/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter(item => { return item.id !== id })
  res.json(204).end()
})
app.post('/api/products', (req, res) => {
  const note = req.body
  if (!note || note.content) {
    res.status(400).json({
      error: 'note content is missing'
    })
  }
  const ids = notes.map(item => item.id)
  const maxId = Math.max(...ids)
  const newProduct = {
    id: maxId + 1,
    content: note.content,
    stock: typeof note.stock !== 'undefined' ? note.stock : false,
    date: new Date().toISOString()
  }
  notes = notes.concat(newProduct)
  res.status(201).json(newProduct)
})

app.listen(PORT, () => { console.log(`Server Puerto ${PORT}`) })
