import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { notificationChange, hideNotification } from '../reducers/notificationReducer'
import { Table, Form, Button } from 'react-bootstrap'


const BlogForm = () => {
    const dispatch = useDispatch()
    const [formVisible, setFormVisible] = useState(false)

    const addBlog = async (event) => {
      event.preventDefault()
      const title = event.target.title.value
      event.target.title.value = ''
      const author = event.target.author.value
      event.target.author.value = ''
      const url = event.target.url.value
      event.target.url.value = ''
      const blog = {
        title: title,
        author: author,
        url: url
      }
      dispatch(createBlog(blog))
      const notification = `a new blog ${title} by ${author} added`
      dispatch(notificationChange(notification))
      setTimeout(() => {
        dispatch(hideNotification())
      }, 5000)
      setFormVisible(false)
  
    }

    const hideWhenVisible = { display: formVisible ? 'none' : '' }
    const showWhenVisible = { display: formVisible ? '' : 'none' }
    return(
      <div>
      <div style={hideWhenVisible}>
      <Button variant="primary" size="lg" block id="new-blog-button" onClick={() => setFormVisible(true)}>Create new blog</Button>
      </div>
      
    <div style={showWhenVisible}>
      <h3>Create new blog</h3>
      <Form onSubmit={addBlog}>
      <Form.Group controlId="formGroupTitle">
        <Form.Label>Title</Form.Label>
          <Form.Control type="text" name="title"  />
      </Form.Group>
      <Form.Group controlId="formGroupAuthor">
        <Form.Label>Author</Form.Label>
          <Form.Control type="text" name="author"  />
      </Form.Group>
      <Form.Group controlId="formGroupUrl">
        <Form.Label>Author</Form.Label>
          <Form.Control type="text" name="url"  />
      </Form.Group>
      <Button variant="outline-primary" id="save-button" type="submit">save</Button>{' '}
      <Button variant="outline-warning" onClick={() => setFormVisible(false)}>cancel</Button>{' '}
      <p></p>
      </Form>
    </div>
    </div>
   
    )
}
    
    

export default BlogForm