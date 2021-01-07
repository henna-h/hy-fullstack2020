import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setSuccessNotification } from '../reducers/successNotificationReducer'
import { setErrorNotification } from '../reducers/errorNotificationReducer'

export const LoginForm = ({
  loginUser
}) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange=({ target }) => {
    setUsername(target.value)
  
  }

  const handlePasswordChange=({ target }) => {
    setPassword(target.value)
  }

  const handleLogin = (event) => {
    event.preventDefault()
    console.log('logging in with ', username, password)

    try {

      loginUser(username, password)

      setUsername('')
      setPassword('')
    } catch (exception) {
      props.setErrorNotification('wrong username or password', 5000)
    }
  }

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id='username'
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            id='password'
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired,
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

const connectedLoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginForm)

export default connectedLoginForm