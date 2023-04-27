import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from './store/store'
import App from './App'

describe('App component', () => {
  it('renders posts link', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    )
    const link = await screen.findByText(/posts/i)
    expect(link).toBeInTheDocument()
  })
})
