import React, { useState } from "react";

const BlogForm = ({ createNewBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    createNewBlog({
      title,
      author,
      url,
    });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h3>Create new</h3>
      <form onSubmit={addBlog}>
        <div>
          <label>
            Title:
            <input
              value={title}
              type="text"
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Author:
            <input
              value={author}
              type="text"
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Url:
            <input
              value={url}
              type="text"
              name="Url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </label>
        </div>
        <button>Create</button>
      </form>
    </div>
  );
};

export default BlogForm;