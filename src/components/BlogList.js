import React, { useState } from "react";
import Blog from "./Blog";
import ListByButtons from "./ListByButtons";

const BlogList = ({ blogs, updateBlog, user,deleteBlog }) => {
  const [order, setOrder] = useState("Normal");
  let blogsToShow = [...blogs];

  if(order === "Normal"){
    blogsToShow = [...blogs]
  }else if(order === "↑"){
    blogsToShow.sort((a, b) => b.likes - a.likes)
  }else{
    blogsToShow.sort((a, b) => a.likes - b.likes)
  }

  const handleListSort = async ({ target }) => setOrder(target.innerText);
  console.log(blogsToShow);
  console.log(order)
  console.log(blogs)
  return (
    <div>
      <ListByButtons handleListSort={handleListSort} />
      {blogsToShow.map((blog) => (
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} user = {user} deleteBlog = {deleteBlog}/>
      ))}
    </div>
  );
};

export default BlogList;
