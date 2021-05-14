import React, { useState } from 'react'
import Notification from './Notification'

const LoginForm = ({ notification, handleLogIn }) => {
  const [username, setUsername ] = useState('')
  const [password , setPassword] = useState('')

  const login = (e) => {
    e.preventDefault()
    handleLogIn({ username,password })
    setUsername('')
    setPassword('')
  }

  return (
    <div className = 'formDiv'>
      <h2>Log into the application</h2>
      {notification && <Notification message = {notification}/>}
      <form onSubmit={login}>
        <div>
          <label>
                Username:
            <input
              value={username}
              type="text"
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
                Password:
            <input
              value={password}
              type="password"
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm
