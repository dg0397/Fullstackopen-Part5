import React from 'react'

const Notification = ({ message }) => {
  return (
    <div className={message.includes('Error') ? 'error' : 'success'} >
      {message}
    </div>
  )
}

export default Notification
