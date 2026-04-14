import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink
} from 'react-router-dom'

import { Pairs } from './partners/partners.view'
import { Posts } from './posts/posts.view'
import { Articles } from './articles/articles.view'
import { MyPosts } from './articles/components/mine/my-posts'
import { OthersPosts } from './articles/components/others/others-posts'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

function App() {
  
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div data-testid='App'>
          <header>
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
                    to='/articles'
                  >
                    Articles
                  </NavLink>
                </li>
              </ul>
            </nav>
          </header>
          <div>
            <Routes>
              <Route path='/' element={<Pairs />} />
              <Route path='/posts' element={<Posts />} />
              <Route path='/articles' element={<Articles />}>
                <Route path='mine' element={<MyPosts />} />
                <Route path='others' element={<OthersPosts />} />
              </Route>
              {/* <Route element={Four04Page} />*/}
            </Routes>
          </div>
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App
