import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams, Redirect
} from "react-router-dom"
import { Table, Form, Button, Navbar, Nav } from 'react-bootstrap'

const Menu = ({user, logout}) => {
  
  return (
    <div>
      <Navbar bg="dark" variant="dark">
    
    <Nav className="mr-auto">
      <Nav.Link href="/">Blogs</Nav.Link>{'   '}
      <Nav.Link href="/users">Users</Nav.Link>{'   '}
      <Navbar.Text>
      Logged in as: {user.name}
    </Navbar.Text>
    </Nav>
    
      
      <Button variant="outline-info" onClick={logout}>Logout</Button>
   
  </Navbar>
      
    </div>
  )
}

export default Menu