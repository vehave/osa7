import React, {useState} from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams, Redirect
} from "react-router-dom"
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Form, Button, Jumbotron } from 'react-bootstrap'

const User = ({ user }) => {
  const blogs = user.blogs.length
  return(
    <tr>
      <td> <Link to={`/users/${user.id}`}>{user.name}</Link>
        
      </td> 
      <td>
        {blogs}
      </td> 
    </tr>
  )
}

const Users = () => {
  const users = useSelector(state => state.users)
  
  
  
  
  return(
    <div>
        <Jumbotron><h2> Users </h2></Jumbotron>
        <Table striped bordered hover variant="dark"> 
        <tbody>
        <tr>
            <th>user</th>
            <th>blogs created</th>
        </tr>
        {users.map(user =>
        <User 
            key={user.id}
            user={user}
        />
        )}
        </tbody>
        </Table>
    </div>
)}

Users.propTypes = {
  blog: PropTypes.object.isRequired
}

 
  
  


export default Users