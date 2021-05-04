import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('renders content by default',() => {
  let component
  beforeEach(() => {
    component = render(
      <Blog blog = {blog}  user = {blog.user}  />
    )
  })
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
  //const mockupdateBlog = jest.fn()
  //const mockdeleteBlog = jest.fn()

  test('renders title',() => {
    //check if title is visible
    expect(component.container).toHaveTextContent(blog.title)
  })

  test('renders author',() => {
    //check if author is visible
    expect(component.container).toHaveTextContent(blog.author)
  })

  test('url and likes not renders by default',() => {
    //check if url is not visible
    expect(component.container).not.toHaveTextContent(blog.url)
    //check if number of likes is not visible
    expect(component.container).not.toHaveTextContent(blog.likes)
    //component.debug()
  })

  test('blogDetails is not render by default',() => {
    const blogDetailsToStart = component.container.querySelector('.blogDetails')
    expect(blogDetailsToStart).toBe(null)
  })


  //const button = component.getByText('view')
  //fireEvent.click(button)
  //console.log(prettyDOM(button))
  //const blogDetailsToEnd = component.container.querySelector('.blogDetails')
  //expect(blogDetailsToEnd).toBeDefined
  //component.debug()
})