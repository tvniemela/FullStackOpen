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
        data-testid='title'
        type='text' value={newTitle} name='Title' onChange={handleTitleChange}
        placeholder='write title'>
        </input><br></br>
        Author: <input
        data-testid='author'
        type='text' value={newAuthor} name='Author' onChange={handleAuthorChange}
        placeholder='write author'>
        </input><br></br>
        Url: <input
        data-testid='url'
        type='text' value={newUrl} name='Url' onChange={handleUrlChange}
        placeholder='write url'>
        </input><br></br>
        <button type='submit'>create</button>
      </form>
    </div>   
  )
}

export default BlogForm