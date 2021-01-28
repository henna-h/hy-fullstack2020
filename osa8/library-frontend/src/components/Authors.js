  
import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'


const Authors = (props) => {
  
  const result = useQuery(ALL_AUTHORS)

  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  console.log(result)

  if (!props.show) {
    return null
  }

  if (result.loading)  {
    return <div>loading...</div>
  }

  const submit = async (event) => {
    event.preventDefault()

    console.log('edit author...')

    editAuthor({  variables: { name, born } })

    setName('')
    setBorn('')
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>

    </div>
  )
}

export default Authors
