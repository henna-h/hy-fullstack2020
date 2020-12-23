import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'


describe('<Blog />', () => {
  let component, blog, user, mockHandlerLike

  beforeEach(() => {

    user = {
      username: "testUser",
      name: "user"
    }
    blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Mikko Mallikas',
      url: "mikkomallikas.com",
      likes: 0,
      user: user
    }

    mockHandlerLike = jest.fn()

    component = render(
      <Blog blog={blog} user={user} onLike={mockHandlerLike} />
    )

  })

  test('correct rendering before toggle', () => {

    const notToggled = component.container.querySelector('.visibleWhenNotToggled')
    console.log(prettyDOM(notToggled))


    expect(notToggled).toHaveTextContent(blog.title)

    expect(notToggled).toHaveTextContent(blog.author)

    expect(notToggled).not.toHaveTextContent(blog.url)

    expect(notToggled).not.toHaveTextContent(blog.likes)

  })

  test('corret rendering after toggling', () => {

    const viewButton = component.getByText("view")
    fireEvent.click(viewButton)

    expect(component.container).toHaveTextContent(blog.url)

    expect(component.container).toHaveTextContent(blog.likes)
  })

  test('eventhandler called twice when like button pressed twice', () => {

    const viewButton = component.getByText("view")
    fireEvent.click(viewButton)

    const likeButton = component.container.querySelector('.like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandlerLike.mock.calls).toHaveLength(2)
  })
})
