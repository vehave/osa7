import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import commentReducer from './reducers/commentReducer'






export const configureStore = () => {
    const reducer = combineReducers({
        notifications: notificationReducer,
        blogs: blogReducer,
        users: userReducer,
        comments: commentReducer
    })
  
    const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

    
  
    return store
}

