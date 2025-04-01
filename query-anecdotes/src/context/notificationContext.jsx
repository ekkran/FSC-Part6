import React, { createContext, useReducer, useContext } from 'react'

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      throw new Error(`Unknown action type: ${action.type}`)
  }
}

const notify = ({ notification, context }) => {  
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }  
  context.dispatch({ type: 'SET_NOTIFICATION', payload: notification })
  setTimeout(() => {
    context.dispatch({ type: 'CLEAR_NOTIFICATION' })
  }, 5000)  
}

export const NotificationProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={{ notification, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context.notification
};

export const useNotificationDispatch = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return (notification) => notify({ notification, context })
}