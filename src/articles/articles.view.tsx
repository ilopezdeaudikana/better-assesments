import { useState, SyntheticEvent, useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Tabs, Tab, Button } from '@mui/material'
import { useUser } from './store/store'
import { Login } from './components/user-form/user-form'

export const Articles = () => {
  const [value, setValue] = useState(0)
  const [toggleUser, setToggleUser] = useState(false)
  const navigate = useNavigate()
  const user = useUser(state => state.user)
  const location = useLocation()

  const handleChange = (_: SyntheticEvent<Element, Event>, newValue: number) => {
    if (newValue === value) {
      return
    }
    const routes = ['mine', 'others']
    setValue(newValue)
    navigate(`/articles/${routes[newValue]}`)
  }

  const handleUserChanged = () => {
    setValue(0)
    setToggleUser(false)
  }

  useEffect(() => {
    if (location.pathname === '/articles' && user.id) {
      navigate('/articles/mine')
    }
  }, [location.pathname])

  return user && user.id && !toggleUser ? (
    <>
      <div className="w-[60rem] flex flex-col p-3 mx-auto my-2 gap-2">
        <Button className="w-[14rem]" variant='outlined'onClick={() => setToggleUser(true)}>Load another author</Button>
        <Tabs
          value={value}
          indicatorColor='primary'
          textColor='primary'
          onChange={handleChange}
          aria-label='Articles navigation'
        >
          <Tab label={user.name} />
          <Tab label='Rest' />
        </Tabs>
        <Outlet />
      </div>
    </>
  ) : (
    <>
      <p className="mb-4">Load author's articles</p>
      <Login onUserChanged={handleUserChanged}/>
    </>
  )
}
