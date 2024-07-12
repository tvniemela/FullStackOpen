const BlogForm = ({
    createBlog,
    newTitle,
    handleTitleChange,
    newAuthor,
    handleAuthorChange,
    newUrl,
    handleUrlChange})=>{
return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
        Title: <input
        type='text' value={newTitle} name='Title' onChange={handleTitleChange}>
        </input><br></br>
        Author: <input
        type='text' value={newAuthor} name='Author' onChange={handleAuthorChange}>
        </input><br></br>
        Url: <input
        type='text' value={newUrl} name='Url' onChange={handleUrlChange}>
        </input><br></br>
        <button type='submit'>create</button>
      </form>
    </div>   
  )
}

export default BlogForm