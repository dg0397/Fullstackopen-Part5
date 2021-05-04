import React, { useState } from 'react'
import PropTypes from 'prop-types'


const BlogForm = ({ createNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createNewBlog({
      title,
      author,
      url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div className = 'formDiv'>
      <h3>Create new</h3>
      <form onSubmit={addBlog}>
        <div>
          <label>
            Title:
            <input
              id = "title"
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
              id = "author"
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
              id = "url"
              value={url}
              type="text"
              name="Url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </label>
        </div>
        <button type="submit" >Create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createNewBlog: PropTypes.func.isRequired
}

export default BlogForm
