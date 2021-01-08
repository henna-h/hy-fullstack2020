import React from 'react'
import styled from 'styled-components'
import {
  Link
} from "react-router-dom"

const BlogLink = styled(Link)`
padding: 0.25em;
font-size: 1em;
color: maroon;
font-weight: bold;
`

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
        <BlogLink to={"/blogs/" + blog.id}>{blog.title} by {blog.author}</BlogLink>
        <br></br>
        </div>
      )}
    </div>
)
}

export default BlogList