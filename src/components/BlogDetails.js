import React from 'react'

const BlogDetails = ({ blog,user,handleLikeButton,handleRemove }) => {
  return (
    <div className = "blogDetails">
      <p>{blog.url}</p>
      <p>likes {blog.likes} <button id = "like-btn" onClick = {handleLikeButton}>Like</button></p>
      <p>{blog.user.name}</p>
      {
        user.username === blog.user.username && <button onClick = {handleRemove} id = "remove-btn">Remove</button>
      }
    </div>
  )
}

export default BlogDetails
