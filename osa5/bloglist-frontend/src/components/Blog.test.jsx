import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog= {
    author:"Joel Spolsky",
    title:"The Joel Test: 12 Steps to Better Code",
    url:"notaUrl",
    likes:0,
    user:{
        username:"user",
        name:"name"
    }
}
test('renders title and author', ()=>{ 

    render (<Blog blog={blog}/>)
    
    expect(screen.getByText(blog.title,{exact:false})).toBeDefined()
    
    expect(screen.getByText(blog.author,{exact:false})).toBeDefined()
})

test('clicking view renders all info about the blog', async ()=>{
    
    render (<Blog blog={blog}/>)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    expect(screen.getByText(blog.title,{exact:false})).toBeDefined()
    expect(screen.getByText(blog.author,{exact:false})).toBeDefined()
    
    expect(screen.getByText(blog.url,{exact:false})).toBeDefined()
    expect(screen.getByText(blog.likes,{exact:false})).toBeDefined()
    expect(screen.getByText(blog.user.name,{exact:false})).toBeDefined()
})

test('clicking like twice calls eventhandler twice', async ()=>{
    
    const mockHandler = vi.fn()
    
    render (<Blog blog={blog} updateLikes={mockHandler}/>)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const likeButton = screen.getByText('like')
    
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
})

