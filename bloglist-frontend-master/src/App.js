import React, { useState, useEffect } from 'react'
import BlogList from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Blog from './components/SingleBlog'
import Menu from './components/Menu'
import Users from './components/Users'
import User from './components/User'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { notificationChange, hideNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { initializeComments } from './reducers/commentReducer'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams, Redirect
} from "react-router-dom"
import { Table, Form, Button, Jumbotron } from 'react-bootstrap'



const App = () => {
  
  const [username, setUsername] = useState('')   
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  
  const dispatch = useDispatch()
  
  useEffect(() => {    
    dispatch(initializeBlogs())   
  },[dispatch])

  useEffect(() => {    
    dispatch(initializeUsers())   
  },[dispatch])

  useEffect(() => {    
    dispatch(initializeComments())   
  },[dispatch])

  useEffect(() => {    
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')    
    if (loggedUserJSON) {      
      const user = JSON.parse(loggedUserJSON)      
      setUser(user)      
      blogService.setToken(user.token)    
    }  
  }, 
  [])

  const handleLogin = async(event) => {    
    event.preventDefault()    
    console.log('logging in with', username, password)
    try {      
      const user = await loginService.login({        
        username, password,      
      })
      window.localStorage.setItem(        
        'loggedBlogappUser', JSON.stringify(user)      
      )
      blogService.setToken(user.token)       
      setUser(user) 
      const notification = `logging in succeed`          
      dispatch(notificationChange(notification))
      setTimeout(() => {
        dispatch(hideNotification())
      }, 5000)              
      setUsername('')      
      setPassword('')    
    } 
    catch (exception) {      
      const notification = 'wrong credentials'          
      dispatch(notificationChange(notification))
      setTimeout(() => {
        dispatch(hideNotification())
      }, 5000) 
         
    }  
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    blogService.ereaseToken()
    const notification = `you are logged out`          
    dispatch(notificationChange(notification))
    setTimeout(() => {
      dispatch(hideNotification())
    }, 5000) 
     
  }

  
  if (user === null) {
    return (
      <div>
        <Notification />
        <h1>blogs app</h1>
        <Jumbotron><h2>Log in to application</h2>
        <Form onSubmit={handleLogin}>
      <Form.Group controlId="formGroupUsername">
        <Form.Label>Username</Form.Label>
          <Form.Control id="username"           
            type="text"           
            value={username}            
            name="Username"            
            onChange={({ target }) => setUsername(target.value)}  />
      </Form.Group>
      <Form.Group controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
          <Form.Control
            id="password"            
            type="password"            
            value={password}            
            name="Password"            
            onChange={({ target }) => setPassword(target.value)}   />
      </Form.Group>
      
      <Button variant="outline-primary" id="login-button" type="submit">Login</Button>{' '}
      
      <p></p>
      </Form>
        
      </Jumbotron>
      </div>
    )
  }

  return (
    <Router>
    <div class="container">
      <Menu user={user} logout={handleLogout} />
      
      <Notification />
      <h1>blogs app</h1>
      
      <Switch>
        <Route path="/users/:id">        
          <User />      
        </Route>

        <Route path="/blogs/:id">        
          <Blog />      
        </Route>

        <Route path="/users">        
          <Users />      
        </Route>
        
        <Route path="/">
        <Jumbotron><h2> Blogs </h2></Jumbotron>
          <BlogForm />
          <BlogList />
        </Route>
      </Switch>
      
      
    </div>
    </Router>
  )
}


export default App