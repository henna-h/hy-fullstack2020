import React, { useRef, useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, deleteBlog, onLike }) => {

  const [newComment, setNewComment] = useState('')
  const [blogToShow, setBlogToShow] = useState(blog)
  console.log(newComment)

  const handleCommentChange = (event) => {
    setNewComment(event.target.value)
  }

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

  const createComment = async (event) => {
    event.preventDefault()
    const commentToAdd = {
      content: newComment
    }

    const returnedBlog = await blogService.addComment(blog.id, commentToAdd)
    setBlogToShow(returnedBlog)
    console.log(blog.comments.map(comment => comment.content))
    setNewComment('')
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
        <span>
          <input value={newComment} onChange={handleCommentChange} />
          <button onClick={createComment}>add a comment</button>
        </span>
      {blogToShow.comments.map(comment =>
        <ul key={comment.id}>
          <li>{comment.content}</li>
        </ul>
      )}
    </div>
  )
}

export default Blog
