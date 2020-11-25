const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User
      .find({}).populate('blogs', { title: 1, author: 1, url: 1 })
  
    response.json(users.map(u => u.toJSON()))
})


usersRouter.post('/', async (request, response, next) => {
  const body = request.body

  if (body.password===undefined) {
    return response.status(400).json({ 
      error: 'password missing' 
    })
  }

  if (body.password.length<3) {
    return response.status(400).json({ 
      error: 'too short password' 
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    passwordHash,
    name: body.name
  })

  user.save()
    .then(savedUser => {
      response.json(savedUser.toJSON())
    })
    .catch(error => next(error))
})

module.exports = usersRouter