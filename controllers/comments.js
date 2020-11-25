const jwt = require('jsonwebtoken')
const commentsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')

commentsRouter.get('/', async (request, response) => {
  const comments = await Comment
    .find({}).populate('blog', { title: 1, author: 1, url: 1 })

  response.json(comments.map(comment => comment.toJSON()))
})

module.exports = commentsRouter