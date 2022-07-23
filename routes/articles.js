const express = require('express')
const router = express.Router()
const models = require('../models')
const { Article } = models.models

//async machine
function asyncHandler(cb) {
    return async (req, res, next) => {
        try {
            await cb(req, res, next)
        } catch (error) {
            res.status(500).send(error)
        }
    }
}

//get articles page
router.get('/', asyncHandler(async (req, res) => {
    const allArticles = await Article.findAll()
    res.render('articles', { allArticles: JSON.parse(JSON.stringify(allArticles)) })
}));

// get new articles page
router.get('/new', asyncHandler(async (req, res) => {
    res.render('articlenew')
}));

// post new articles page to create form
router.post('/new', asyncHandler(async (req, res) => {
    const newBlog = await Article.create(req.body)
    console.log(newBlog.toJSON())
    res.redirect('/')
}));

//get viewblog wich is the page to delete and redirect to edit
router.get('/viewblog:id', asyncHandler(async (req, res) => {
    const wantedBlog = await Article.findByPk(req.params.id)
    res.render('viewblog', { wantedBlog: wantedBlog.toJSON() })
}));

//deleting wantedBlog
router.post('/delete:id', asyncHandler(async (req, res) => {
    const wantedBlog = await Article.findByPk(req.params.id)
    wantedBlog.destroy()
    res.redirect('/')
}));

//going to edit the wantedblog
router.post('/editblog:id', asyncHandler(async (req, res) => {
    const wantedBlog = await Article.findByPk(req.params.id)
    res.render('editblog', { wantedBlog: wantedBlog.toJSON() })
}));

//updating from edit page
router.post('/updatedblog:id', asyncHandler(async (req, res) => {
    const wantedBlog = await Article.findByPk(req.params.id)
    wantedBlog.update(req.body)
    res.redirect('/')
}));


//to change the schemma
router.get('/drop', asyncHandler(async (req, res) => {
    await Article.drop()
    res.redirect('/')
}));

router.get('/sync', asyncHandler(async (req, res) => {
    await Article.sync({ force: true })
    res.redirect('/')
}));

module.exports = router