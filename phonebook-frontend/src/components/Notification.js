const Notification = (props) => {
    if (props.errorMessage !== null) {
  
    return (
      <div className="error">
        {props.errorMessage}
      </div>
    )
    }
  
    if (props.message !== null) {
  
      return (
        <div className="success">
          {props.message}
        </div>
      )
    }
  
    return null
  }
  
  export default Notification