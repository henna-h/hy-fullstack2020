import React from 'react'
import { connect } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'


const AnecdoteList = (props) => {

    const vote = async (anecdote) => {
      const votedAnecdote = {
          ...anecdote,
          votes: anecdote.votes + 1
      }
      
      await anecdoteService.update(votedAnecdote)
      props.voteFor(anecdote)
      const text = "you voted '" + anecdote.content + "'"
      props.setNotification(text)
    }

    return (
        <div>
            {props.anecdotes.sort((a, b) => (b.votes - a.votes)).map(anecdote =>
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
    console.log('state.filter: ' + state.filter.toString())

    if(state.filter === 'ALL'){
        return {
            anecdotes: state.anecdotes
        }
    }

    return {
        filter: state.filter,
        anecdotes: state.anecdotes
            .filter(a => a.content.toLowerCase().includes(state.filter.toString().toLowerCase()))
    }

}

const mapDispatchToProps = {
    voteFor,
    setNotification
}

const connectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default connectedAnecdotes