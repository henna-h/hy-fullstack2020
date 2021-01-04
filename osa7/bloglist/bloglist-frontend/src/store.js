import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import errorNotificationReducer from './reducers/errorNotificationReducer'
import successNotificationReducer from './reducers/successNotificationReducer'

const reducer = combineReducers({
  successNotification: successNotificationReducer,
  errorNotification: errorNotificationReducer,
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store