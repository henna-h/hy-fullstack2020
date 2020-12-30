import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'
import anecdotes from '../services/anecdotes'


const AnecdoteList = (props) => {

    const vote = async (anecdote) => {
      const votedAnecdote = {
          ...anecdote,
          votes: anecdote.votes + 1
      }
      const updatedAnecdote = await anecdoteService.update(votedAnecdote)
      props.voteFor(anecdote)
      const text = "you voted " + "'" + anecdote.content + "'"
      props.setNotification(text)
    }

    return (
        <div>
            {props.anecdotes.map(anecdote =>
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

const mapStateToProps = (state) => {

    console.log(state.filter)
    return {
        filter: state.filter,
        anecdotes: state.anecdotes
            .filter(a => a.content.toLowerCase().includes(state.filter.toString().toLowerCase()))
            .sort((a, b) => (b.votes - a.votes))
    }

}

const mapDispatchToProps = {
    voteFor,
    setNotification
}

const connectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default connectedAnecdotes