import { useState } from 'react'

const Statistics = (props) => {
  if (props.good==0 && props.neutral==0 && props.bad==0){
  return (
    <div>
    <h1>statistics</h1>
    <p>No feedback given</p>
    </div>
  )
  }
  else{
    return(
    <div>
      <h1>statistics</h1>
      <StatisticLines text="good" value={props.good}/>
      <StatisticLines text="neutral" value={props.neutral}/>
      <StatisticLines text="bad" value={props.bad}/>
      <StatisticLines text="all" value={props.good+props.neutral+props.bad}/>
      <StatisticLines text="average" value={(props.good-props.bad)/(props.good+props.neutral+props.bad)}/>
      <StatisticLines text="positive" value={props.good/(props.good+props.neutral+props.bad)*100 + " %"}/>
    </div>
    
  )
  }
}

const StatisticLines=(props)=>( 
    <p>{props.text} {props.value}</p>
)

const Button=(props)=>(
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {

  const [good, setGood] = useState(0) 
  const [neutral, setNeutral] = useState(0) 
  const [bad, setBad] = useState(0)

  return (
    <div>  
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good+1)} text="good"/>
      <Button handleClick={() =>setNeutral(neutral+1)} text="neutral"/>
      <Button handleClick={() =>setBad(bad+1)} text="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>

    </div>
  )
}

export default App