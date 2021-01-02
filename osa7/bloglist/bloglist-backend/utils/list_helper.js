var _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {

  if(blogs.length < 1){
    return null;
  }

  const reducer = (sum, blog) => {
    return sum + blog.likes;
  }
  const total = blogs.reduce(reducer, 0)
  return total;
}

const favoriteBlog = (blogs) => {
  let favBlog = blogs[0]
  for (var i = 0; i < blogs.length; i++) {
    if(blogs[i].likes > favBlog.likes){
      favBlog = blogs[i]
    }
  }
  return favBlog
}

const mostBlogs = (blogs) => {

  if(blogs.length < 1){
    return null;
  }

  var authors = []

  for(var i = 0; i < blogs.length; i++){
    authors.push(blogs[i].author)
  }

  var authorWithMostBlogs = _.head(_(authors)
  .countBy()
  .entries()
  .maxBy(_.last));

  let numberOfBlogs = 0

  for(var i = 0; i < blogs.length; i++){
    if(blogs[i].author === authorWithMostBlogs ){
      numberOfBlogs++
    }
  }
  
  toBeReturned = {author: authorWithMostBlogs, blogs: numberOfBlogs}

  return toBeReturned
}

const mostLikes = (blogs) => {

  if(blogs.length < 1){
    return null;
  }

  favBlog = favoriteBlog(blogs)
  toBeReturned = {author: favBlog.author, likes: favBlog.likes}
  return toBeReturned
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs, 
  mostLikes
}
