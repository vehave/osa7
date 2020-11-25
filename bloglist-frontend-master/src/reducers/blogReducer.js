import blogService from '../services/blogs'



const blogReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'LIKE':
      const id = action.data.id
      return state.map(a =>
        a.id !== id ? a : action.data
      )
    case 'NEW_BLOG':
      return [...state, action.data]
    
    
    
    case 'INIT_BLOGS':      
      return action.data  

    case 'DELETE_BLOG': 
      const ide = action.data.id     
      return state.filter(a =>
        a.id !== ide) 
    
      default: return state
  }

  
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}



export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const like = (blog) => {
  const likedBlog = { 
      ...blog, 
      likes: blog.likes+1 
  }
  const id = blog.id
  return async dispatch => {
    await blogService.update(id, likedBlog)
    dispatch({
      type: 'LIKE',
      data: likedBlog
    })
  }
  
}

export const deleteBlog = (blog) => {
  
  const id = blog.id
  return async dispatch => {
    await blogService.deleteBlog(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: blog
    })
  }
  
}

export default blogReducer