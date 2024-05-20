import { useState,useEffect} from 'react'
import Personform from './components/Personform.jsx'
import Filter from './components/Filter.jsx'
import Persons from './components/Persons.jsx'
import personData from './services/persondata.js'
import Notification from './components/Notification.jsx'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber]= useState('')
  const [filterName, setFilterName]= useState('')
  const [errorMessage, setErrorMessage]=useState('')

  useEffect(()=>{
    personData.getAll()
    .then(persons=>{setPersons(persons)})
  },[])
  
  const removePerson= (id,name)=> {
    if (window.confirm(`Delete ${name} ?`)){
      personData.remove(id)
      setPersons(persons.filter(person=>person.id !==id))
      setErrorMessage(`Deleted ${name}`)
      setTimeout(()=>{
        setErrorMessage(null)
      },2000)
    }
  }

  const addPerson=(event)=>{
    event.preventDefault()
    const newPerson={
      name:newName, 
      number:newNumber}
    if (persons.some(person => person.name==newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else{
        personData.create(newPerson)
        .then(person=>{setPersons(persons.concat(person))})
        setErrorMessage(`Added ${newName}`)
        setTimeout(()=>{
          setErrorMessage(null)
        },2000)
        setNewName('')
        setNewNumber('')

    }     
  }
  
  const handleNameChange=(event)=>{setNewName(event.target.value)}
  const handleNumberChange=(event)=>{setNewNumber(event.target.value)}

  const handleFilterChange=(event)=>{setFilterName(event.target.value)}
  const filteredNames=persons.filter(person => person.name.toLowerCase().includes(filterName))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter value={filterName} onChange={handleFilterChange}/>
      <h3>Add a new</h3>
      
      <Personform value={newName} onChange={handleNameChange}
      value2={newNumber} onChange2={handleNumberChange}
      onSubmit={addPerson}/>
      <h3>Numbers</h3>
       
      <Persons filteredNames={filteredNames} removePerson={removePerson}/>
    </div>
  )

}

export default App