import ('/src/index.css')

const Notification = ({message, errorMessage}) =>{
    if(message){
        return(
        <div className='message'>
            {message}
        </div>)
    }
    else if(errorMessage){
        return(
        <div className='error'>
            {errorMessage}
        </div>)
    }
    return null
}  

export default Notification