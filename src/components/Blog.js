import React, { useState } from "react";
const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  const handleClick = ()=>setVisible(!visible)

  const blogDetails = (
    <>
      <p>{blog.url}</p>
      <p>likes {blog.likes} <button>Like</button></p>
      <p>{blog.user.name}</p>
    </>
  )

  return (
    <div style = {blogStyle}>
      <h3>{blog.title} {blog.author} <button onClick = {handleClick}>{visible ? "hide" : "view"}</button> </h3>  
      {
        visible && blogDetails
      }
    </div>
  );
};

export default Blog;