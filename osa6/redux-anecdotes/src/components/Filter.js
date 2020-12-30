import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'


const Filter = () => {
  const dispatch = useDispatch()
  const handleChange = (event) => {

    // input-kentän arvo muuttujassa event.target.value
    const filterContent = event.target.value
    console.log(filterContent)
    dispatch(setFilter(filterContent))
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

const mapDispatchToProps = {
    setFilter
}

export default Filter