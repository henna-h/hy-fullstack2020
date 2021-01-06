import React from 'react'
import {
  Link
} from "react-router-dom"

const BlogList = ({ blogs }) => {
    blogs.sort((a, b) => b.likes-a.likes)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

  return(
    <div>
      {blogs.map(blog =>
        <div style={blogStyle} key={blog.id}>
        <Link to={"/blogs/" + blog.id}>{blog.title} by {blog.author}</Link>
        <br></br>
        </div>
      )}
    </div>
)
}

export default BlogList