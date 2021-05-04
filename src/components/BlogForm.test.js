import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render,fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('renders content by default',() => {
  const blog = {
    'author': 'dg0397',
    'likes': 35,
    'title': 'Learning GraphQL',
    'url': 'leargrapgql.com',
    'user': {
      'username': 'dg0397',
      'name': 'Dionisio',
      'id': '6058e0392a3fc348a4bf8586'
    },
    'id': '605b74bcf0e9ae4a709879db'
  }
  const createBlog = jest.fn()
  let component

  beforeEach(() => {
    component = render(<BlogForm createNewBlog = {createBlog} /> )
  })

  test('Form is rendered',() => {
    const form = component.container.querySelector('.formDiv')
    expect(form).toBeDefined()
  })

  test('form updates parent state and calls onSubmit',() => {
    const form = component.container.querySelector('form')
    const author = component.container.querySelector('#author')
    const title = component.container.querySelector('#title')
    const url = component.container.querySelector('#url')

    fireEvent.change(author, {
      target: { value: blog.author }
    })
    fireEvent.change(title, {
      target : { value : blog.title }
    })
    fireEvent.change(url, {
      target : { value : blog.url }
    })
    fireEvent.submit(form)

    //check prop function calls
    expect(createBlog.mock.calls).toHaveLength(1)
    //check input values
    expect(createBlog.mock.calls[0][0].author).toBe(blog.author)
    expect(createBlog.mock.calls[0][0].title).toBe(blog.title)
    expect(createBlog.mock.calls[0][0].url).toBe(blog.url)
  })
})