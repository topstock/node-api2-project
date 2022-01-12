// implement your server here
const express = require('express')
const postsRouter = require('./posts/posts-router')

const server = express()

const port = 8000

server.use('/api/posts', postsRouter)

server.get('*', (req, res) => {
  res.status(404).json({ message: "The post with the specified ID does not exist" })
})

server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})

// require your posts router and connect it here
module.exports = server;