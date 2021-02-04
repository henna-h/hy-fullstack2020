import React, { useState } from 'react'
import { useApolloClient, useQuery } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import Recommendations from './components/Recommendations'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { USER } from './queries'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const [errorNotification, setErrorNotification] = useState(null)
  const client = useApolloClient()
  const user = useQuery(USER)

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

  console.log(user)
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
        <button onClick={() => setPage('recommendations')}>recommended</button>
        <button onClick={() => logout()}>log out</button>
      </div>

      <h2>{errorNotification}</h2>

      <Recommendations
        show={page === 'recommendations'}
        user={user.data.me}
      />

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