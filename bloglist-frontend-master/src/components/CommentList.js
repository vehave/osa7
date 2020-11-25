import React, {useState} from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams, Redirect
} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, like, deleteBlog } from '../reducers/blogReducer'
import { createComment } from '../reducers/commentReducer'
import { notificationChange, hideNotification } from '../reducers/notificationReducer'
import { Table, Form, Button } from 'react-bootstrap'

const Comments = ({blog}) => {
    const id = blog.id
    const dispatch = useDispatch()
    
    const comments = useSelector(state => state.comments.filter((n => n.blog.id === id)))
    
    
    

    const addComment = async (event) => {
      event.preventDefault()
      const content = event.target.content.value
      event.target.content.value = ''
      const comment = {
        content: content,
        blog: blog
      }
      dispatch(createComment(blog, comment))
      dispatch(hideNotification())
      dispatch(initializeBlogs())
      dispatch(notificationChange(`comment added`))
      setTimeout(() => {
          dispatch(hideNotification())
        }, 5000)
  }
    
    

    if (!blog) {    
        return null  
    }
    
    return (
      <div>
      
        <Table striped bordered hover variant="dark"> 
        <tbody>
        <tr>
            <th>Comments</th>
            
        </tr>
          {comments.map(comment =>
            <tr key={comment.id}>{comment.content}</tr>
          )}
        </tbody>
      </Table>
        
        
        <Form onSubmit={addComment}>
        <Form.Group controlId="formGroupComment">
        
          <Form.Control type="text" id="content"
        name="content"  />
      </Form.Group>
      <Button variant="outline-primary" id="add-button" type="submit">add comment</Button>{' '}
      
      
      </Form>
      
      
      </div>
    )
}

export default Comments