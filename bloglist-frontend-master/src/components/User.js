import React, {useState} from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams, Redirect
} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { Table, Form, Button, Card, Jumbotron } from 'react-bootstrap'

const User = () => {
    const id = useParams().id  
    const user = useSelector(state => state.users.find((n => n.id === id)))
    
    if (!user) {    
        return null  
    }

    return (
      <div>
        <Jumbotron><h2> {user.name} </h2></Jumbotron>
        <Table striped bordered hover variant="dark"> 
        <tbody>
          <tr>
            <th>added blogs</th>
          </tr>
          {user.blogs.map(blog =>
          <tr key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link>

          </tr>
          )}
        </tbody>
        </Table>
        
      </div>
    )
}

export default User