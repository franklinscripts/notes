const express = require('express')
const app = express()

app.use(express.json())

let notes = [
      {
        "id": 1,
        "content": "HTML is easy",
        "important": false
      },
      {
        "id": 2,
        "content": "Browser can execute only JavaScript",
        "important": false
      },
      {
        "id": 3,
        "content": "GET and POST are the most important methods of HTTP protocol",
        "important": true
      },
      {
        "content": "Do Home work",
        "important": false,
        "id": 4
      },
      {
        "content": "Show me some things in the kitchen",
        "important": false,
        "id": 5
      },
     
    ]

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (req, res) => {
    res.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    if(note){
        response.json(note)
    }else {
        response.status(404).end()
    }
    response.json(note)
})

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter(note => note.id !== id)

  res.status(204).end()
})

const generateId = () => {
  const maxId = notes.length > 0
  ? Math.max(...notes.map(n => n.id)) : 0

  return maxId + 1
}
app.post('/api/notes', (req, res) => {
  const body = req.body
  if (!body.content) {
    return res.status(400).json({
      error: 'Content Missing'
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId()
  }

  notes = notes.concat(note)
 
  res.json(note)
})

const PORT = 3001;
app.listen(PORT);
console.log('Server running on port ' + PORT)
