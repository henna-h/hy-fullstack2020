import React from 'react'

const User = ({ user }) => {
    
    if (!user) {
      return null
    }
    
    return (
      <div>
        <h1>{user.name}</h1>
        <h2>added blogs</h2>
        {user.blogs.map(blog =>
          <ul key={blog.id}>
            <li>{blog.title} by {blog.author}</li>
          </ul>)}
      </div>
    )
}

export default User