const notesRouter=require('express').Router()
const Blog=require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

notesRouter.get('/', async (request, response) => {
    const blogs=await Blog.find({}).populate('user', {username:1,name:1})
    response.json(blogs)
  })
  
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization&&authorization.startsWith('Bearer ')){
    return authorization.replace('Bearer ', '')
  }
  return null
}

notesRouter.post('/', async (request, response) => {
    const body = request.body

    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
      if (!decodedToken){
        return response.status(401).json({error: 'token invalid'})
      }

    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
      url: body.url,
      title: body.title,
      author: body.author,
      likes: body.likes,
      user: user._id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  })
  
 notesRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).json()
 }) 

module.exports=notesRouter