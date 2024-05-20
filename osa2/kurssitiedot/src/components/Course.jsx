const Course =(props)=>{
  
    return (
      <div>
      <Header name={props.course.name}/>
      <Content parts={props.course.parts}/>
      <Total parts={props.course.parts}/>
      </div>
    )   
  }
  const Header = (props)=>{
    return(
          <h2>{props.name}</h2>  
    )
  }
  const Content =(props)=>{
    return(  
      <div>
        {props.parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} /> )} 
      </div>
    )
  }
  const Part=(props)=>{  
    return(
        <p>{props.part} {props.exercises}</p>
    )
  }
  
  const Total=(props) => {
    const total=props.parts.reduce((acc, cur) => acc+cur.exercises,0)
    return (
        <b>total of {total} exercises</b>
    )
  }
  
  export default Course