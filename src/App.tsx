import React from 'react'
import logo from './logo.svg'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink
} from 'react-router-dom'
import { Pairs } from './pairs/Pairs'
import { Posts } from './posts/Posts'

import './App.css'

function App() {
  return (
    <Router>
      <div data-testid='App' className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <nav>
            <ul className='inline-flex rounded-lg my-3 p-1 bg-gray-500 bg-opacity-30 mx-auto'>
              <li className='mx-1'>
                <NavLink
                  className={({ isActive }) =>
                    [
                      'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                      isActive ? 'bg-gray-900 text-white' : null
                    ]
                      .filter(Boolean)
                      .join(' ')
                  }
                  to='/'
                >
                  Pairs
                </NavLink>
              </li>
              <li className='mx-1'>
                <NavLink
                  className={({ isActive }) =>
                  [
                    'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                    isActive ? 'bg-gray-900 text-white' : null
                  ]
                    .filter(Boolean)
                    .join(' ')
                }
                  to='/posts'
                >
                  Posts
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <div>
          <Routes>
            <Route path='/' element={<Pairs />} />
            <Route path='/posts' element={<Posts />} />
            {/* <Route element={Four04Page} />*/}
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
