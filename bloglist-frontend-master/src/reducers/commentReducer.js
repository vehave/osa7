import blogService from '../services/blogs'
import commentService from '../services/comments'



const commentReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    
    case 'NEW_COMMENT':
      return [...state, action.data]
    
    
    
    case 'INIT_COMMENTS':      
      return action.data  

    
    
    default: return state
  }

  
}



export const createComment = (blog, comment) => {
    const id = blog.id
    console.log(comment)
    return async dispatch => {
        const newComment = await blogService.comment(id, comment)
    dispatch({
      type: 'NEW_COMMENT',
      data: newComment, id
    })
  }
}

export const initializeComments = () => {
  return async dispatch => {
    const comments = await commentService.getAll()
    dispatch({
      type: 'INIT_COMMENTS',
      data: comments
    })
  }
}



export default commentReducer