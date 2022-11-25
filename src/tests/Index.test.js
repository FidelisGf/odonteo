import React from 'react'
import ReactDOM from 'react-dom'
import { ReactStrictMode, rootElement } from '../index.js'

jest.mock('react-dom', () => ({ render: jest.fn() }))

describe('index.js', () => {
  it('renders without crashing', () => {
    ReactDOM.render(ReactStrictMode, rootElement)
    expect(ReactDOM.render).toHaveBeenCalledWith(ReactStrictMode, rootElement)
  })
})