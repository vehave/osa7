const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 }).populate('comments', { content: 1})

  response.json(blogs.map(blog => blog.toJSON()))
})

const getTokenFrom = request => {  
  const authorization = request.get('authorization')  
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {    
    return authorization.substring(7)  
  }  
  return null
}

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const token = getTokenFrom(request)  
  const decodedToken = jwt.verify(token, process.env.SECRET)  
  if (!token || !decodedToken.id) {    
    return response.status(401).json({ error: 'token missing or invalid' })  
  }  
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author, 
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)  
  await user.save()

  response.json(savedBlog.toJSON())
})

blogsRouter.post('/:id/comments', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  const body = request.body
   

  const comment = new Comment({
    content: body.content,
    blog: blog._id
  })

  const savedComment = await comment.save()
  blog.comments = blog.comments.concat(savedComment._id)  
  await blog.save()

  response.json(savedComment.toJSON())  
})

blogsRouter.delete('/:id', async (request, response, next) => {
  
  const blog = await Blog.findById(request.params.id)
  
  const token = getTokenFrom(request)  
  const decodedToken = jwt.verify(token, process.env.SECRET) 
  if ( blog.user.toString() === decodedToken.id.toString() ){
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } 
  else {    
    return response.status(401).json({ error: 'token missing or invalid' })  
  } 

    
  
  
  
})

blogsRouter.put('/:id', (request, response, next) => {
    const body = request.body
    

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes


    }
  
    Blog.findByIdAndUpdate(request.params.id, blog, { new: body.likes })
      .then(updatedBlog => {
        response.json(updatedBlog)
      })
      .catch(error => next(error))
})

module.exports = blogsRouter