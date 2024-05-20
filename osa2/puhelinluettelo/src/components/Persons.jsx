const Persons=({filteredNames, removePerson})=>{
    return(
      <div>
      {filteredNames.map(person=><p key={person.id}> {person.name} {person.number}
        <button onClick={() => removePerson(person.id,person.name)}>delete</button></p>)
      }
      </div>
    )
}
export default Persons