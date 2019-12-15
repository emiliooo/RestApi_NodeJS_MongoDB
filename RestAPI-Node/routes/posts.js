const express = require('express');
const router = express.Router();
const Post = require('../models/Post');


router.get('/', async (req, res) => {
    try {
        const posts = await Post.find()
        res.json(posts);
    } catch (err) {
        res.json({
            message: err
        })
    }
});

router.post('/', async (req, res) => {
    const post = new Post({
        expense: req.body.expense,
        title: req.body.title
    });

    try {
        const savedPost = await post.save();
        res.json(savedPost)
    } catch (err) {
        console.log(err)
    }

})

router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post)
    } catch (err) {
        console.log(err)
    }

})

router.delete('/:postId', async (req, res) => {
    console.log(req.params.postId)
    try {
        const removePost = await Post.remove({
            _id: req.params.postId
        })
        res.json(removePost)
    } catch (err) {
        console.log(err)
    }

})

router.patch('/:postId', async (req, res) => {
    try {
        const updatePost = await Post.updateOne(
              {_id: req.params.postId},
              { $set: { expense:req.body.expense, title:req.body.title}}
              )
        res.json(updatePost);
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;