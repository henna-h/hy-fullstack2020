import React from 'react'
import { connect } from 'react-redux'


const Notification = (props) => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if(props.notification !== null){
    return (
      <div style={style}>
        {props.notification.text}
      </div>
    )
  }

  return null

}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const connectedNotification = connect(mapStateToProps)(Notification)

export default connectedNotification