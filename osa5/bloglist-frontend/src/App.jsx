import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/Blogform'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])
  const [newTitle, setNewTitle] =useState('')
  const [newAuthor, setNewAuthor] =useState('')
  const [newUrl, setNewUrl] =useState('')
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }
    ,[])

  useEffect(()=>{
    setTimeout(()=>{
      setMessage(null)
  },5000)
  },[message])
    
  useEffect(()=>{
    setTimeout(()=>{
      setErrorMessage(null)
  },5000)
  },[errorMessage])

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user= await loginService.login({username, password})
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage(`a successful login`)
    }
    catch(exception){
      setErrorMessage('wrong credentials')
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const createBlog = async (event) => {
    event.preventDefault()
    try{
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }
    const createdBlog = await blogService.create(newBlog)
    setBlogs(blogs.concat(createdBlog))
    setMessage(`a new blog ${createdBlog.title} by ${createdBlog.author} added`)
    }
    catch(exception){
      setErrorMessage('error')
    }
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  const updateLikes = async (id, oldBlog) => {
    try{
      const newBlog={
        user:oldBlog.user.id,
        likes:oldBlog.likes+1,
        title:oldBlog.title,
        author:oldBlog.author,
        url:oldBlog.url
      }
      
      const updatedBlog= await blogService.update(id, newBlog)
      const newBlogs=blogs.map((blog)=>blog.id==id ? updatedBlog : blog)
      setBlogs(newBlogs)
      setMessage(`blog liked`)
    }
    catch(exception){
      setErrorMessage('error')
    }
    
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification errorMessage={errorMessage}/>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
            type='text' value={username} name='Username' 
            onChange={({target}) => setUsername(target.value)} 
            />
          </div>
          <div>
            password
            <input 
              type='password' value={password} name='Password'
              onChange={({target})=> setPassword(target.value)}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }
  return(
    <div>
      <h2>blogs</h2>
      <Notification message={message} errorMessage={errorMessage}/>
      <p>{user.name} logged in <button type='submit' onClick={handleLogOut}>logout</button></p>
      <Togglable buttonLabel="create">
        <BlogForm 
        createBlog={createBlog}
        newTitle={newTitle}
        handleTitleChange={({target})=> setNewTitle(target.value)}
        newAuthor={newAuthor}
        handleAuthorChange={({target})=> setNewAuthor(target.value)}
        newUrl={newUrl}
        handleUrlChange={({target})=> setNewUrl(target.value)}  />
        </Togglable>
    
    {blogs.toSorted((a,b)=>b.likes - a.likes).map(blog =>
      <Blog key={blog.id} blog={blog} updateLikes={updateLikes}/>
    )}
  </div>
  )
}

export default App