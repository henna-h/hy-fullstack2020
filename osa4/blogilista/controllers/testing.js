const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

console.log('testing.js')

router.post('/reset', async (request, response, next) => {
  console.log('router.post')
  try{
    await Blog.deleteMany({})
    await User.deleteMany({})

    response.status(204).end()
  } catch(exception) {
    next(exception)
  }
})

module.exports = router