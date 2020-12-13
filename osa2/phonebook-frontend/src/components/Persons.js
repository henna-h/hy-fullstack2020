const Person = ({person, handleDelete}) => {
    return (
      <div>
        {person.name} {person.number} <button onClick={() => handleDelete(person.id, person.name)} >delete</button>
      </div>
    )
  }
  
  const Persons = ({personsToShow, handleDelete}) => {
    return (
      <ul>
        {personsToShow.map(person =>
        <Person key={person.name} person={person} handleDelete={handleDelete} />
       )}
      </ul>
    )
  }
  
  export default Persons; 