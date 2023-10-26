const express = require('express')
const Route = require('./routes/routes')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(Route)

app.use(express.static('public'));

app.listen(port, () => {
  
  console.log(`Server Runing in PORT:${port}`)
})