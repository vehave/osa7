import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(state => state.notifications)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (notification === ''){
    return (
      null
    )
  }
  return (
    <Alert variant="info">
    {notification}
  </Alert>
  )
}

export default Notification