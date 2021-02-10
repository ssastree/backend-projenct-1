const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'usa /tabla' })
})

app.get('/tabla', db.getUsers)
app.get('/tabla/:id', db.getUserById)
app.post('/tabla', db.createUser)
app.put('/tabla/:id', db.updateUser)
app.delete('/tabla/:id', db.deleteUser)

app.listen(port, () => {
  console.log(`corriendo en el puerto ${port}.`)
})