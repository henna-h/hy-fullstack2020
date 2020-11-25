import React, { useState, useEffect } from 'react';
import './App.css';
import countryService from './services/country'

const CountriesList = (props) => {

  if(props.countriesToShow.length < 10 && props.countriesToShow.length > 1){
    return(
      <ul>
        {props.countriesToShow.map(country =>
        <li key={country.name}>{country.name} <button name={country.name} onClick={() => props.handleShowSingleCountry(country.name)}>show</button></li>
        )}
      </ul>
    )
  } else if(props.countriesToShow.length < 1){
    return(
      <div>
        No matches.
      </div>
    )
  } else if(props.countriesToShow.length === 1){
    return(
      <div>
        <SingleCountry singleCountry={props.countriesToShow[0]} />
      </div>
    )
  } else {

    return(
      <div>
        Too many matches. Please specify.
      </div>
    )
  }
}

const SingleCountry = (props) => {
  return(
    <div>
      <h1>{props.singleCountry.name}</h1>
      <p>capital: {props.singleCountry.capital}</p>
      <p>population: {props.singleCountry.population}</p>
      <h3>Languages</h3>
      <ul>
        {props.singleCountry.languages.map(language =>
        <li key={language.name}>{language.name}</li>
        )}
      </ul>
      <img 
      src={props.singleCountry.flag}
      height="100px"
      alt="flag"
      />
    </div>
  )
}

function App() {
  const [countries, setCountries] = useState([])
  const [toShow, setToShow] = useState('')


  useEffect(() => {
    countryService
      .getAll()
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleToShowChange = (event) => {
    console.log(event.target.value)
    setToShow(event.target.value)
  }

  const countriesToShow = countries.filter(country => { return country.name.toLowerCase().includes(toShow.toLowerCase())})

  const handleShowSingleCountry = (name) => {
    setToShow(name)
  }


  return (
    <div>
      find countries <input onChange={handleToShowChange} />
      <CountriesList countriesToShow={countriesToShow} handleShowSingleCountry={handleShowSingleCountry}/>
    </div>
  )
}

export default App;
