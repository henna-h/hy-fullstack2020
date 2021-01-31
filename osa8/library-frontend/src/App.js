import React, { useState } from 'react'
import { useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const [errorNotification, setErrorNotification] = useState(null)
  const client = useApolloClient()

  if (!token) {
    return (
      <div>

        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
  
        />
      </div>
    )
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => logout()}>log out</button>
      </div>

      <h2>{errorNotification}</h2>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        setErrorNotification={setErrorNotification}
        setPage={setPage}
      />

    </div>
  )
}

export default App