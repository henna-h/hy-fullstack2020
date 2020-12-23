import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {

  let component, blog, user, createBlogHandler

  beforeEach(() => {

    user = {
      username: "testUser",
      name: "user"
    }


    createBlogHandler = jest.fn()

    component = render(
      <BlogForm blog={blog} user={user} createBlog={createBlogHandler} />
    )

  })

  test('blog form calls eventhandler it received as props with the right details when a new blog is created', () => {
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const createButton = component.container.querySelector('#create-button')

    fireEvent.change(title, {
      target: { value: 'Testing testing' },
    })

    fireEvent.change(author, {
      target: { value: 'Im an author!' },
    })

    fireEvent.change(url, {
      target: { value: 'testing.com' },
    })

    fireEvent.click(createButton)
  })
})