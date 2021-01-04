import React, { useRef } from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, user, deleteBlog, onLike }) => {
  console.log(user)
  console.log(blog.user.username)
  console.log(blog.user)

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


  return (
    <div style={blogStyle}>

      <div id="title-and-author" className="visibleWhenNotToggled">
        {blog.title} {blog.author}
      </div>
      <Togglable buttonLabel="view" closingButtonLabel="hide" ref={blogRef} >
        {blog.url}
        <br></br>
        likes {blog.likes} <button className="like" onClick={() => onLike(blog)}>like</button>
        <br></br>
        {blog.user.name}
        <DeleteButton />
      </Togglable>
    </div>
  )
}

export default Blog
