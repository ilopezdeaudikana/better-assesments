import { useState, SyntheticEvent } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Tabs, Tab } from '@mui/material'
import { getArticles } from './services/articles-service'
import { useUser } from './store/store'
import { Login } from './components/user-form/user-form'
import { useQuery } from '@tanstack/react-query'

export const Articles = () => {
  const [value, setValue] = useState(0)
  const navigate = useNavigate()
  const user = useUser(state => state.user)

  const query = useQuery({ queryKey: ['articles'], queryFn: getArticles, staleTime: 5 * 1000 * 60 })

  const handleChange = (_: SyntheticEvent<Element, Event>, newValue: number) => {
    if (newValue === value) {
      return
    }
    const routes = ['mine', 'others']
    setValue(newValue)
    navigate(`/articles/${routes[newValue]}`)
  }

  return user && user.id ? (
    <>
      <div>
        <Tabs
          value={value}
          indicatorColor='primary'
          textColor='primary'
          onChange={handleChange}
          aria-label='Posts navigation'
        >
          <Tab label='Mine' />
          <Tab label='Others' />
        </Tabs>
        <Outlet context={[query.data, user.id]} />
      </div>
    </>
  ) : (
    <>
      <div>Load user articles</div>
      <Login />
    </>
  )
}
