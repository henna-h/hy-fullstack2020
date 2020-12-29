import React from 'react'
import { setFilter } from '../reducers/filterReducer'


const Filter = () => {

  const handleChange = (event) => {
    // input-kentän arvo muuttujassa event.target.value
    const filterContent = event.target.value
    console.log(filterContent)
    setFilter(filterContent)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter