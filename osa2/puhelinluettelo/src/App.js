import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personsService from './services/persons'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'


const App = () => {

  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [showAll, setShowAll] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personsService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])


  const addPerson = (event) => {
    event.preventDefault()
    const personInThePhonebook = persons.filter(
      (person) => person.name === newName
    );

    if(personInThePhonebook.length > 0){
      if(window.confirm(newName + ' is already added to the phonebook, replace the old number with a new one?')){

        const updatedPerson = {
          name: newName,
          number: newNumber
        }
    
        const id = personInThePhonebook[0].id
        personsService
        .update(id, updatedPerson)
        .then(() => {
          setNewName('');
          setNewNumber('');
          window.location.reload(true);

        })
        .catch(() => {
          setErrorMessage('Information of ' + personInThePhonebook[0].name + ' has already been deleted deleted from the server')
        });

      }

    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => {

        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
        setMessage(newName + ' added to the phonebook')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleToShowChange = (event) => {
    console.log(event.target.value)
    setShowAll(event.target.value)
  }

  const handleDelete = (id, deletedName) => {
    console.log(id)
    console.log(deletedName)

    const wantToDelete = window.confirm('Delete ' + deletedName +  '?')

    if(wantToDelete){
      axios
      .delete('http://localhost:3001/persons/' + id)
      .then(response => {
        window.location.reload(true);
        setMessage(deletedName + ' deleted')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
    }

  }

  const personsToShow = persons.filter(person => { return person.name.toLowerCase().includes(showAll.toLowerCase())})

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification errorMessage={errorMessage} message={message} />
      <Filter showAll={showAll} handleToShowChange={handleToShowChange} />
      <PersonForm addPerson ={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete}/>
    </div>
  )

}

export default App
