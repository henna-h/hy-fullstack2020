import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)


const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type){
    case 'VOTE':

      const id = action.data.id
      console.log(action.data.id)
      const anecdoteToVote = state.find(a => a.id === id)

      const updatedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }

      return state.map(a => a.id !== id ? a : updatedAnecdote)

    case 'NEW_ANECDOTE':
      return [...state, action.data]
    
    case 'INIT_ANECDOTES':
      return action.data

    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const voteFor = (anecdote) => {
  return async dispatch => {
    await anecdoteService.update(anecdote)
    dispatch ({
      type: 'VOTE',
      data:  anecdote
    })
  }
}

export default anecdoteReducer