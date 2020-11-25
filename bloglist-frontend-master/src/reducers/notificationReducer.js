const notificationReducer = (state = '', action) => {
    switch (action.type) {
      case 'NOTIFICATION':
        return [...state, action.notification]
      case 'HIDE_NOTIFICATION':
        return ''
      default:
        return state
    }
}
  
export const notificationChange = (notification) => {
  
    return {
      type: 'NOTIFICATION',
      notification
    }
}

export const hideNotification = (notification) => {
  return {
    type: 'HIDE_NOTIFICATION'
    
  }
}
  
export default notificationReducer
