import React, {useState} from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams, Redirect
} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, like, deleteBlog } from '../reducers/blogReducer'
import { createComment } from '../reducers/commentReducer'
import { notificationChange, hideNotification } from '../reducers/notificationReducer'
import Comments from './CommentList'
import { Table, Form, Button, Card, Jumbotron } from 'react-bootstrap'
import { FaThumbsUp } from 'react-icons/fa'

const Blog = () => {
    const id = useParams().id  
    const dispatch = useDispatch()
    const blog = useSelector(state => state.blogs.find((n => n.id === id)))
    const comments = useSelector(state => state.comments.filter((n => n.blog.id === id)))
    
    
    const likeBlog = async (blog) => {
        dispatch(like(blog))
        dispatch(hideNotification())
        dispatch(notificationChange(`you liked ${blog.title} by ${blog.author}`))
        setTimeout(() => {
            dispatch(hideNotification())
          }, 5000)
    }

    
    
    const deleteBlogi = async (blog) => {
        
        if(window.confirm(`Delete ${blog.title} by ${blog.author}?`)){
          dispatch(deleteBlog(blog))
          dispatch(hideNotification())
          dispatch(notificationChange(`Deleted ${blog.title} by ${blog.author}`))
          setTimeout(() => {
            dispatch(hideNotification())
          }, 5000)
          
        }
        
    }

    if (!blog) {    
        return null  
    }
    
    return (
      <div>
        <Jumbotron>
          
          <h2>{blog.title}</h2>
          
          <p>
        author: {blog.author}
      </p>
      <p>
      <Link to={blog.url}>{blog.url}</Link>
      </p>
      <p>
        likes: {blog.likes}
         
        
      </p>
      <p>
      <Button variant="outline-primary" id="like-button" onClick={() => likeBlog(blog)}>
          <FaThumbsUp />
        </Button>{' '}
      <Button variant="outline-danger" onClick={()=>deleteBlogi(blog)}>delete</Button>
      </p>
          
          </Jumbotron>
      
        
      <Comments blog={blog}/>
      </div>
    )
}

export default Blog