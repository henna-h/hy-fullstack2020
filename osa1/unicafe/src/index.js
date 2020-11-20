import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if(props.allClicks > 0){
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
          <StatisticsLine text="good" value={props.good} />
          <StatisticsLine text="neutral" value={props.neutral} />
          <StatisticsLine text="bad" value={props.bad} />
          <StatisticsLine text="all" value={props.allClicks} />
          <StatisticsLine text="average" value={props.average} />
          <StatisticsLine text="positive" value={props.positive + "%"} />
          </tbody>
        </table>
      </div>
    )
  } else {
    return(
      <div>
        <h1>statistics</h1>
        <h3>No feedback given</h3>
      </div>
    )
  }
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState(0)
  const average = (good - bad) /allClicks
  const positive = (good/ (good + neutral + bad))*100

  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(allClicks + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(allClicks + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(allClicks + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick = {handleGoodClick} text="good" />
      <Button handleClick = {handleNeutralClick} text="neutral" />
      <Button handleClick = {handleBadClick} text="bad" />
    
      <Statistics good={good} neutral={neutral} bad={bad} allClicks={allClicks} average={average} positive={positive} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)