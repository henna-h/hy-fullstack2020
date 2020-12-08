const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes;
  };
  const total = blogs.reduce(reducer, 0)
  return total;
}

module.exports = {
  dummy,
  totalLikes
}
