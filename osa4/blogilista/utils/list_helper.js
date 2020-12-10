const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
