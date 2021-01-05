import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Users from './components/Users'
import Togglable from "./components/Togglable"
import blogService from './services/blogs'
import loginService from './services/login'
import { connect } from 'react-redux'
import { setSuccessNotification } from './reducers/successNotificationReducer'
import { setErrorNotification } from './reducers/errorNotificationReducer'
import {
  BrowserRouter as Router,
  Switch, Route, Link,
  useHistory
} from "react-router-dom"


export const App = (props) => {
  const blogFormRef = useRef()
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


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

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        props.setSuccessNotification('New blog added: ' + returnedBlog.title + ' by ' + returnedBlog.author, 5000)
      })
      .catch = () => {
        props.setErrorNotification('something went wrong', 5000)
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
      props.setErrorNotification('wrong username or password', 5000)
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

  const menu = () => {
    return (
      <div>
        <Link to="/">blogs</Link>
        <Link to="/users">users</Link>
      </div>
    )
  }

  const blogForm = () => (

    <div>
      <Togglable buttonLabel="add blog" closingButtonLabel="cancel" ref={blogFormRef}>

        <BlogForm createBlog = {addBlog} />
      </Togglable>
    </div>
  )

  const onLike = async (blog) => {

    const blogObject = {
      ...blog,
      likes: blog.likes+1,
      user: blog.user.id
    }

    console.log(user)
    console.log(blog.user.id)
    console.log(blog.id, blogObject)

    await blogService.update(blog.id, blogObject)
    setBlogs(blogs.map(b => b.id !== blog.id ? blogObject: b))
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

  const users = () => (
    <div>
      <Users />
    </div>
  )

  const deleteBlog = async (id) => {
    await blogService.remove(id)
    const blogsAfterRemove = blogs.filter(b => b.id !== id)
    setBlogs(blogsAfterRemove)
    props.setSuccessNotification('Blog deleted!', 5000)

  }


  return (
    <div>
      <Notification />
      {user === null && loginForm()}
      {user !== null && loggedIn()}
      {user !== null && menu()}

      <Switch>
          <Route path="/users">
            {user !== null && users()}
          </Route>
        <Route path="/">
        <h2>blogs</h2>
          {user !== null && blogForm()}
          {user !== null && bloglist()}
        </Route>
      </Switch>

    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    successNotification: state.successNotification,
    errorNotification: state.errorNotification
  }
}

const mapDispatchToProps = {
  setSuccessNotification,
  setErrorNotification
}

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default connectedApp