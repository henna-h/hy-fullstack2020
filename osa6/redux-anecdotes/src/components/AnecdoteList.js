import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'


const AnecdoteList = () => {

    const anecdotes = useSelector(state => state.anecdotes)
    anecdotes.sort((a, b) => (b.votes - a.votes))
    const dispatch = useDispatch()
  
    const vote = (id) => {
      dispatch(voteFor(id))
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList