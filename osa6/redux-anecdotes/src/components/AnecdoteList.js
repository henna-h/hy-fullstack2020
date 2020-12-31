import React from 'react'
import { connect } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteList = (props) => {

    const vote = (anecdote) => {

      props.voteFor(anecdote)
      props.setNotification(`you voted ${anecdote.content}`, 5000)
    }
    console.log(props.anecdotes)
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
            notification: state.notification,
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