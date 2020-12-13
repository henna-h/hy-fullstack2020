import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
<<<<<<< HEAD
=======
import reportWebVitals from './reportWebVitals';
>>>>>>> 7c7d4cff15363cbd7bc23e67d3e329c23b7d6885
import axios from 'axios'

axios.get('http://localhost:3001/persons').then(response => {
  const persons = response.data
  ReactDOM.render(
    <App persons={persons} />,
    document.getElementById('root')
  )
})
<<<<<<< HEAD
=======
/*
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
*/
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
//ReactDOM.render(<App />, document.getElementById('root'))
>>>>>>> 7c7d4cff15363cbd7bc23e67d3e329c23b7d6885
