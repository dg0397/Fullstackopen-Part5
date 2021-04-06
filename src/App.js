import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'

import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

import './App.css'
import BlogList from './components/BlogList'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const [notification, setNotification] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogIn = async (e) => {
    e.preventDefault()
    console.log('loggin with', username, password)
    try {
      const user = await loginService.getLogin({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(error)
      setNotification('Error: Wrong username or password')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }
  const handleLogOut = () => {
    window.localStorage.clear()
    setUser(null)
    setPassword('')
    setUsername('')
  }
  const handleCreateNewBlog = async (blog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const newBlog = await blogService.create(blog)
      console.log(newBlog)
      setBlogs(blogs.concat(newBlog))
      setNotification(`Added new Blod: ${newBlog.title}`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (error) {
      console.log(error)
    }
  }

  const updateBlog = async(blog) => {
    try{
      const updatedBlog = await blogService.update(blog)
      console.log(updatedBlog)
      setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog))
      setNotification(`Updated Blog: ${updatedBlog.title}`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch(error){
      console.log(error)
    }
  }
  const deleteBlog = async (blogToDelete) => {
    console.log(blogToDelete)
    try{
      await blogService.deleteBlog(blogToDelete.id)
      setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id))
      setNotification(`Deleted Blog: ${blogToDelete.title}`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }catch(error){
      console.log(error)
    }
  }
  console.log(blogs)
  return (
    <div>
      {user === null ? (
        <>
          <h2>Log into the application</h2>
          {notification && (
            <div
              className={notification.includes('Error') ? 'error' : 'success'}
            >
              {notification}
            </div>
          )}
          <form onSubmit={handleLogIn}>
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
        </>
      ) : (
        <>
          <h1>Blogs</h1>
          {notification && (
            <div
              className={notification.includes('Error') ? 'error' : 'success'}
            >
              {notification}
            </div>
          )}
          <h2>{user.username} Logged in</h2>
          <button onClick={handleLogOut}>LogOut</button>
          <Togglable buttonLabel="Create New Blog"  ref = {blogFormRef}>
            <BlogForm createNewBlog={handleCreateNewBlog} />
          </Togglable>
          <BlogList updateBlog = {updateBlog} blogs = {blogs} user = {user} deleteBlog = {deleteBlog}/>
        </>
      )}
    </div>
  )
}

export default App
