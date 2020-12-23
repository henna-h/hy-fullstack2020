import React from 'react'

const Notification = ({ errorMessage, message }) => {

  if(errorMessage !== null){
    return (  
      <div className="error">
        {errorMessage}
      </div>
    )
  }
  if(message !== null){
    return (   
      <div className="success">
        {message}
      </div>
    )
  }
  return (
    null
  )
}

export default Notification