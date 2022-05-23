const express = require('express')
const Route = require('./routes/routes')
const app = express()

app.get('/', (req, res) => {
  res.send('Server Runing')
})

app.use(express.json())
app.use(Route)

app.listen(3000, () => {
  console.log(`Server Runing http://localhost:3000`)
})