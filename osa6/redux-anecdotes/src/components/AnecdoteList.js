import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'


const AnecdoteList = () => {

    const dispatch = useDispatch()
    //const anecdotes = useSelector(state => state.anecdotes)
    const anecdotes = useSelector(({filter, anecdotes}) => {
    
      return anecdotes
              .filter(a => a.content.toLowerCase().includes(filter.filter.toLowerCase()))
              .sort((a, b) => (b.votes - a.votes))
    })   

    const vote = async (anecdote) => {
      const votedAnecdote = {
          ...anecdote,
          votes: anecdote.votes + 1
      }
      const updatedAnecdote = await anecdoteService.update(votedAnecdote)
      dispatch(voteFor(anecdote))
      const text = "you voted " + "'" + anecdote.content + "'"
      dispatch(setNotification(text))
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
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList