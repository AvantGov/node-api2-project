// * dependencies
const express = require('express')

// * defining router + database info 
const router = express.Router()
const database = require('../data/db')

// * all posts 
router.get('/api/posts', (req, res) => {
    database.find()
        .then((response) => {
            res.status(200).json(response)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({ message: 'error on the promise response' })
        })

})

// * get post by id @ /api/posts/:id 
router.get('/api/posts/:id', (req, res) => {
    const id = req.params.id
    
    database.findById(id)
        .then((response) => {
            res.status(200).json(response)
        })
        .catch((error) => {
            console.log(error)
            res.status(401).json({ message: 'error on the promise response'})

        })

})

// * get post comments by post id @ /api/posts/:id/comments
router.get('/api/posts/:id/comments', (req, res) => {
    const id = req.params.id

    database.findPostComments(id)
        .then((response) => {
            res.status(200).json(response)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({ message: 'error on the promise response'})
        })
})


// * delete post by id @ /api/posts/:id
router.delete('/api/posts/:id', (req, res) => {
    const id = req.params.id

    const post = database.findById(id)
        .then((response) => { 
            console.log(response)
            res.status(200).json(response)
            return true
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({ message: error })
            return false
        })

    if (post) {
        database.remove(id)
        .then((response) => {
            console.log(response)
            res.status(200).json(response)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({ message: error })
        })  
    } else {
        res.status(401).json({ message: 'post not found' })
    }
})


// * updates post by id @ /api/posts/:id
router.put('/api/posts/:id', (req, res) => {
    const id = req.params.id
    const post = database.findById(id)

    if (post) {
        database.update(id, req.body)
            .then((response) => {
                console.log(response)

                
            })
    }


})



// * create new post @ /api/posts
router.post('/api/posts', (req, res) => {
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({ message: 'post must have title and content'})
    }

    database.insert(req.body)
        .then((response) => {
            console.log(response)
            res.status(200).json({ message: 'post successfully added'})
        })
        .catch((error) => {
            res.status(500).json({ message: 'error on the promise response'})
        })
})



// * creates new comment by post id @ /api/posts/:id/comments
router.post('/api/posts/:id/comments', (req, res)=> {
    if (!req.body.text) {
        res.status(400).json({ message: 'comment must have content'})
    }

    database.insertComment(req.body)
        .then((response) => {
            console.log(response)
            res.status(200).json({ message: 'comment successfully added'})
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({ message: error})
        })

})


module.exports = router