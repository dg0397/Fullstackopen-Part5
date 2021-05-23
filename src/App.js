import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'

import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

import './App.css'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const [notification, setNotification] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogIn = async (userData) => {
    try {
      const user = await loginService.getLogin(userData)
      setNotification(`Welcome ${user.name}`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
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
  }
  const handleCreateNewBlog = async (blog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const newBlog = await blogService.create(blog)
      setBlogs(blogs.concat(newBlog))
      setNotification(`Added new Blog: ${newBlog.title}`)
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
  return (
    <div>
      {user === null ? (
        <LoginForm notification = {notification} handleLogIn = {handleLogIn} />
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
          <button onClick={handleLogOut} id = "logout">LogOut</button>
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
