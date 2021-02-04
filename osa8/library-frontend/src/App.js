import React, { useState } from 'react'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import Recommendations from './components/Recommendations'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { USER, ALL_BOOKS, BOOK_ADDED } from './queries'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const [notification, setNotification] = useState(null)
  const [errorNotification, setErrorNotification] = useState(null)
  const client = useApolloClient()
  const user = useQuery(USER)

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(b => b.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if(dataInStore != null){
      if (!includedIn(dataInStore.allBooks, addedBook)) {
        client.writeQuery({
          query: ALL_BOOKS,
          data: { allBooks : dataInStore.allBooks.concat(addedBook) }
        })
      }  
    } 
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData)
      const addedBook = subscriptionData.data.bookAdded
      setNotification("New book, " + addedBook.title + ", added")
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      updateCacheWith(addedBook)
    }
  })

  if (!token) {
    return (
      <div>
        <LoginForm
          setToken={setToken}
          setErrorNotification={setErrorNotification}
          errorNotification={errorNotification}
  
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

      <h2>{notification}</h2>

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
        setNotification={setNotification}
        updateCacheWith={updateCacheWith}
        setPage={setPage}
      />

    </div>
  )
}

export default App