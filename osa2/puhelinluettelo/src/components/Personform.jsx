const Personform=({value, value2, onChange, onChange2, onSubmit})=>{
    return(
      <form onSubmit={onSubmit}>
          <div>
            name: <input  value={value} onChange={onChange}/>
          </div>
          <br></br> 
          <div>
            number: <input value={value2} onChange={onChange2}/>
          </div> 
          <br></br>   
          <div>
            <button type="submit">add</button>
          </div>
        </form>
    )
  }
export default Personform