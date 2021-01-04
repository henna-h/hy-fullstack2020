import React from 'react'
import { connect } from 'react-redux'

export const Notification = (props) => {

  if(props.errorNotification !== null){
    return (  
      <div className="error">
        {props.errorNotification.text}
      </div>
    )
  }
  if(props.successNotification !== null){
    return (   
      <div className="success">
        {props.successNotification.text}
      </div>
    )
  }
  return (
    null
  )
}

const mapStateToProps = (state) => {
  return {
    successNotification: state.successNotification,
    errorNotification: state.errorNotification
  }
}

const connectedNotification = connect(mapStateToProps)(Notification)

export default connectedNotification