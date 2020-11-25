import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('renders only title', () => {
  const blog = {
    title: 'bloginOtsikko',
    author: 'lalalala',
    url: 'comcomoon',
    likes: 55
  }
  
  const component = render(
    <Blog blog={blog} />
  )

  const div = component.container.querySelector('.onlyTitle')


  expect(div).toHaveTextContent(
    'bloginOtsikko'
  )

  expect(div).not.toHaveTextContent(
    'lalalala'
  )

  expect(div).not.toHaveTextContent(
    'comcomoon'
  )

  expect(div).not.toHaveTextContent(
    '55'
  )

    
})

test('renders also details', () => {
  const blog = {
    title: 'bloginOtsikko',
    author: 'lalalala',
    url: 'comcomoon',
    likes: 55
  }
  
  const component = render(
    <Blog blog={blog} />
  )

  const div = component.container.querySelector('.alsoDetails')


  expect(div).toHaveTextContent(
    'bloginOtsikko'
  )

  expect(div).toHaveTextContent(
    'lalalala'
  )

  expect(div).toHaveTextContent(
    'comcomoon'
  )

  expect(div).toHaveTextContent(
    '55'
  )

    
})

test('can add likes', () => {
  const blog = {
    title: 'bloginOtsikko',
    author: 'lalalala',
    url: 'comcomoon',
    likes: 55
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} like={mockHandler}/>
  )


  

  

  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)



})