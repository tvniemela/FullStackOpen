import {useState} from 'react'

const Blog = ({ blog, updateLikes}) => {
  const [show,setShow]=useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return(
  <div style={blogStyle}>
    {show ? 
    <div>
    {blog.title} {blog.author} 
    </div>
    :
    <div> 
    {blog.title} {blog.author}
    <br></br>
    {blog.url}
    <br></br>
      likes {blog.likes} <button onClick={()=>updateLikes(blog.id, blog)}>like</button>
    <br></br>
    {blog.user.name}
    </div>}
    <button onClick={()=>{setShow(!show)}}>{show?'view':'hide'}</button>
  </div>) 

}
  

export default Blog