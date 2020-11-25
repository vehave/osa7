import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { connect } from 'react-redux'
import { like, deleteBlog } from '../reducers/blogReducer'
import { notificationChange, hideNotification } from '../reducers/notificationReducer'
import PropTypes from 'prop-types'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams, Redirect
} from "react-router-dom"
import { Table, Form, Button } from 'react-bootstrap'




const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  
  

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
  
  
  return(
    <div>
        <Table striped bordered hover variant="dark">      
        <tbody>
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <tr>
          <td><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></td>
      
      
      <td><Button variant="outline-danger" onClick={()=>deleteBlogi(blog)}>delete</Button>{' '}  </td>
        
            
        </tr>
        )}
        </tbody>
        </Table>
        </div>
)}

BlogList.propTypes = {
  blog: PropTypes.object.isRequired,
  like: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}

 
  
  


export default BlogList
