import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './index.css'
import App from './App'
import store from './store.js'
import {
  BrowserRouter as HashRouter
} from "react-router-dom"

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('root')
)