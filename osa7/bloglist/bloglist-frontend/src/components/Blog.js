import React, { useRef } from 'react'

const Blog = ({ blog, user, deleteBlog, onLike }) => {
  console.log(user)
  console.log(blog)

  const blogRef = useRef()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleDeleteButton = async (event) => {
    const confirmDelete = window.confirm("Are you sure you want to delete " + blog.title + " by " + blog.author)

    if(confirmDelete){
      deleteBlog(blog.id)
    }
  }

  const DeleteButton = () => {
    //Why can't I access user id?
    if(user.username === blog.user.username || user._id === blog.user){
      return(
        <button onClick={handleDeleteButton}>delete</button>
      )
    } else {
      return ( null )
    }
  }

  console.log("blog.comments: " + blog.comments.map(comment => comment))

  return (
    <div style={blogStyle}>
      <h1>{blog.title} by {blog.author}</h1> 
      <p>Website: <a href={blog.url}>{blog.url}</a></p>
      <br></br>
      likes {blog.likes} <button className="like" onClick={() => onLike(blog)}>like</button>
      <br></br>
      <p>added by {blog.user.name}</p>
      <DeleteButton />

      <h2>Comments</h2>
      {blog.comments.map(comment =>
        <ul key={comment.id}>
          <li>{comment.content}</li>
        </ul>
      )}
    </div>
  )
}

export default Blog
