import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'


const Filter = (props) => {
  const handleChange = (event) => {

    const filterContent = event.target.value
    console.log('filterContent: ' + filterContent)
    props.setFilter(filterContent)
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

const mapStateToProps = (state) => {
  return{
    filter: state.filter
  }
}

const mapDispatchToProps = {
    setFilter
}

const connectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter)

export default connectedFilter