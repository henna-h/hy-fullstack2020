import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
      <h2>{props.name}</h2>
    )
  }
  
  const Total = (props) => {
  
    const exercises = props.parts.map(part =>
      part.exercises)
    const reducer = (accumulator, currentValue) => accumulator + currentValue
    const sum = exercises.reduce(reducer)
  
    return(
      <b>total of {sum} exercises</b>
    ) 
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Content = ({course}) => {
    return (
      <div>
          {course.parts.map(part =>
            <div key = {part.name}>
              <Part part ={part} />
            </div>)}
      </div>
    )
  }
  
  const Course = ({course}) => {
    return (
      <div>
        <Header name={course.name} />
        <Content course= {course} />
        <Total parts={course.parts} />
      </div>
    )
  }

  export default Course