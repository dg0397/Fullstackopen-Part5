import React, { useState } from 'react'
import BlogDetails from './BlogDetails'

const Blog = ({ blog,updateBlog,user, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleClick = () => setVisible(!visible)

  const handleLikeButton = () => {
    updateBlog({
      ...blog,
      likes: blog.likes + 1
    })
  }

  const handleRemove = () => {
    if(window.confirm(`Remove Blog: ${blog.title}! by ${blog.author}`)){
      deleteBlog(blog)
    }
  }

  //const blogDetails = (
  //  <>
  //    <p>{blog.url}</p>
  //    <p>likes {blog.likes} <button onClick = {handleLikeButton}>Like</button></p>
  //    <p>{blog.user.name}</p>
  //    {
  //      user.username === blog.user.username && <button onClick = {handleRemove}>Remove</button>
  //    }
  //  </>
  //)

  return (
    <div style = {blogStyle}>
      <h3>{blog.title} {blog.author} <button onClick = {handleClick}>{visible ? 'hide' : 'view'}</button> </h3>
      {
        visible && <BlogDetails blog = {blog} user = {user} handleLikeButton = {handleLikeButton} handleRemove = {handleRemove} />
      }
    </div>
  )
}

export default Blog