const PersonForm = (props) => {
    
    return (
      <div>
        <form onSubmit={props.addPerson}>
          <div>
            name: <input value={props.newName} onChange={props.handleNameChange} />
          </div>
          <br></br>
          <div>
            number: <input value={props.newNumber} onChange={props.handleNumberChange} />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>
    )
}

export default PersonForm
