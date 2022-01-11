// implement your server here
const express = require('express')

const server = express()

const port = 8000


server.get('/', (req, res) => {
  res.send('Running Smoothe!')
})
  
server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})

// require your posts router and connect it here
module.exports = server;