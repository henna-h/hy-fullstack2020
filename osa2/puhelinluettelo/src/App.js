import React, { useState, useEffect } from 'react'
<<<<<<< HEAD
=======
import axios from 'axios'
>>>>>>> 7c7d4cff15363cbd7bc23e67d3e329c23b7d6885
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
<<<<<<< HEAD
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
=======
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
 // const [names, setNames] = useState([])
>>>>>>> 7c7d4cff15363cbd7bc23e67d3e329c23b7d6885
  const [showAll, setShowAll] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personsService
      .getAll()
<<<<<<< HEAD
      .then(initialPersons => {
        setPersons(initialPersons)
=======
      .then(response => {
        setPersons(response.data)
>>>>>>> 7c7d4cff15363cbd7bc23e67d3e329c23b7d6885
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
<<<<<<< HEAD
    
        const id = personInThePhonebook[0].id

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

=======
        //MUUTA PERSONS/ID
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
      
>>>>>>> 7c7d4cff15363cbd7bc23e67d3e329c23b7d6885
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }

<<<<<<< HEAD
      personsService
      .create(personObject)
      .then(returnedPerson => {
  
        setPersons(persons.concat(returnedPerson))
=======
      axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
  
        setPersons(persons.concat(personObject))
>>>>>>> 7c7d4cff15363cbd7bc23e67d3e329c23b7d6885
        setNewName('')
        setNewNumber('')
        setMessage(newName + ' added to the phonebook')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
<<<<<<< HEAD
      .catch(error => {
       const errorToShow = error.response.data
        console.log(errorToShow)
        setErrorMessage('Name needs to be longer than 3 characters and phonenumber needs to be longer than 5 numbers')
      });
=======
>>>>>>> 7c7d4cff15363cbd7bc23e67d3e329c23b7d6885
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
<<<<<<< HEAD

    const wantToDelete = window.confirm('Delete ' + deletedName +  '?')

    if(wantToDelete){
      personsService
      .remove(id)
      .then(() => {
=======
 
    const wantToDelete = window.confirm('Delete ' + deletedName +  '?')

    if(wantToDelete){
      axios
      .delete('http://localhost:3001/persons/' + id)
      .then(response => {
>>>>>>> 7c7d4cff15363cbd7bc23e67d3e329c23b7d6885
        window.location.reload(true);
        setMessage(deletedName + ' deleted')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
    }
<<<<<<< HEAD

=======
    
>>>>>>> 7c7d4cff15363cbd7bc23e67d3e329c23b7d6885
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

<<<<<<< HEAD
export default App
=======
export default App
>>>>>>> 7c7d4cff15363cbd7bc23e67d3e329c23b7d6885
