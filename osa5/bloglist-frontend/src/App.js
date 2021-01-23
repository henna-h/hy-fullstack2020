import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from "./components/Togglable"
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const blogFormRef = useRef()
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()

    try{
      await blogService.create(blogObject)
      setBlogs(blogs.concat(blogObject))
      setMessage('New blog added: ' + blogObject.title + ' by ' + blogObject.author)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch {
      setErrorMessage('something went wrong')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with ', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogOut = async (event) => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const loginForm = () => (
    <div>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </div>
  )

  const blogForm = () => (

    <div>
      <Togglable buttonLabel="add blog" closingButtonLabel="cancel" ref={blogFormRef}>

        <BlogForm createBlog = {addBlog} />
      </Togglable>
    </div>
  )

  const onLike = (blog) => {

    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user,
      likes: blog.likes+1
    }

    console.log(blog.id, blogObject)

    blogService
      .update(blog.id, blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.map(b => b.id !== blog.id ? b : returnedBlog))
      })
  }

  const bloglist = () => {

    blogs.sort((a, b) => b.likes-a.likes)

    return(
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={user} deleteBlog={deleteBlog} onLike={onLike} className="blog" />
        )}
      </div>
    )
  }

  const loggedIn = () => (
    <div>
      <p>{user.name} logged in </p>
      <button type="submit" onClick={handleLogOut}>logout</button>
    </div>
  )

  const deleteBlog = async (id) => {
    await blogService.remove(id)
    const blogsAfterRemove = blogs.filter(b => b.id !== id)
    setBlogs(blogsAfterRemove)
    setMessage("Blog deleted!")

  }


  return (
    <div>
      <Notification message={message} errorMessage={errorMessage}/>

      <h2>blogs</h2>
      {user !== null && loggedIn()}
      {user !== null && blogForm()}

      {user === null && loginForm()}
      {user !== null && bloglist()}

    </div>
  )
}

export default App