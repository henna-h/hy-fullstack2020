const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')
const bodyParser = require('body-parser')
blogsRouter.use(bodyParser.json())
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id,
      comments: []
    })
  
    try {
      const savedBlog = await blog.save()

      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()    

      response.json(savedBlog.toJSON())
    } catch(exception) {
      next(exception)
    }
})

blogsRouter.get('/:id', async (request, response, next) => {
    try{
      const blog = await Blog.findById(request.params.id)
      if (blog) {
        response.json(blog.toJSON())
      } else {
        response.status(404).end()
      }
    } catch(exception) {
      next(exception)
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    
  const body = request.body

  const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: body.user
  }
  try{
      const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
      if(updatedBlog) {
        response.json(updatedBlog.toJSON())
      }

  } catch(exception){
      next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    try{
        const decodedToken = jwt.verify(request.token, process.env.SECRET)

        if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
        }
    
        const blog = await Blog.findById(request.params.id)

        if(!blog){
            return response.status(404).end()
        }

        if ( blog.user.toString() === decodedToken.id.toString() ){
            await Blog.findByIdAndRemove(request.params.id)

            response.status(204).end()
        }
    } catch (exception) {
      next(exception)
    }
})

//comments

blogsRouter.post('/:id/comments', async (request, response, next) => {

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = await Blog.findById(request.params.id)

    if(!blog) {
      response.status(404).end()
    }

   const comment = request.body

    blog.comments = blog.comments.concat(comment)

    savedBlog = await blog.save()
    response.status(200).json(savedBlog.toJSON())

  } catch (exception) {
    next(exception)
  }

})


module.exports = blogsRouter