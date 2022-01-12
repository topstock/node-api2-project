// implement your posts router here
const express = require('express')

const {
    find,
    findById,
    insert,
    update,
    remove,
    findPostComments,
    findCommentById,
    insertComment,
  } = require('./posts-model')

const router = express.Router()

router.use(express.json())

router.get('/:id/comments', (req, res) => {
    res.send('just the comments of one id!')
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    const idPost = await findById(id)
    try { 
      if ((typeof idPost) !== 'undefined') {
        res.status(200).json({ ...idPost})
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist" })
      }
    } 
    catch {
      res.status(500).json({ message: "The posts information could not be retrieved" })
    }
})

router.get('/', async (req, res) => {
  const posts = await find()
  try { 
    res.status(200).json(posts)
  } catch {
    res.status(500).json({ message: "The posts information could not be retrieved" })
  }
})
  
router.post('/', async (req, res) => {
    try {
        if (!req.body.title || !req.body.contents) {
          res.status(400).json({message: "Please provide title and contents for the post"})
        } else {
          const {id} = await insert(req.body)
          const newPost = await findById(id)
          res.status(201).json({ ...newPost})
        }
      } catch(err) {
        res.status(500).json({ message: "There was an error while saving the post to the database" })
      }
})

router.put('/:id', async (req, res) => {
  const id = req.params.id
  const idPost = await findById(id)
  try {
    if ((typeof idPost) === 'undefined') {
        res.status(404).json({ message: "The post with the specified ID does not exist"})
    } else if (!req.body.title || !req.body.contents) {
        res.status(400).json({message: "Please provide title and contents for the post"})
    } else {
      await update(id, req.body)
      console.log("updated", id)
      const updatedPost = await findById(id)
      res.status(201).json({ ...updatedPost})
    }
  } catch(err) {
    res.status(500).json({ message: "The post information could not be modified" })
  }
})

router.delete('/:id', async (req, res) => {
    const idPost = await findById(id)
    try {
        if ((typeof idPost) === 'undefined') {
            res.status(404).json({ message: "The post with the specified ID does not exist"})
        } else {
            await remove(id)
            res.status(200).json({ message: `The server removed the post with id: ${id}` })
        }
    } catch {
        res.status(500).json({ message: "The post could not be removed" })
    }
})
router.get('*', (req, res) => {
  res.status(404).json({ message: "The post with the specified ID does not exist" })
})
  

// require your posts router and connect it here
module.exports = router;