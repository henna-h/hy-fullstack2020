import React, { useState, useEffect } from 'react'
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
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  const addPerson = (event) => {
    event.preventDefault()
    const personInThePhonebook = persons.filter(
      (person) => person.name === newName
    );

    if(personInThePhonebook.length > 0){
      if(window.confirm(newName + ' is already added to the phonebook, replace the old number with a new one?')){

        const id = personInThePhonebook[0].id
        console.log(id)

        const person = persons.find(p => p.id === id)

        const updatedPerson = {...person, number: newNumber}


        personsService
        .update(id, updatedPerson)
        .then((returnedPerson) => {
          setPersons(persons.map(p => p.id !== id ? p : returnedPerson))
          setNewName('');
          setNewNumber('');
          window.location.reload(true);
        })
        .catch(error => {
          const errorToShow = error.response.data
          console.log(errorToShow)
          setErrorMessage('Information of ' + personInThePhonebook[0].name + ' has already been deleted from the server')
          setPersons(persons.filter(p => p.id !== id))
        });

      }
      
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
    
      personsService
      .create(personObject)
      .then(returnedPerson => {
  
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setMessage(newName + ' added to the phonebook')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
       const errorToShow = error.response.data
        console.log(errorToShow)
        setErrorMessage('Name needs to be longer than 3 characters and phonenumber needs to be longer than 5 numbers')
      });
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
      personsService
      .remove(id)
      .then(() => {
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