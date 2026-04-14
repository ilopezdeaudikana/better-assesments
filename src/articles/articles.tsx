import { useState, useEffect, SyntheticEvent } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Tabs, Tab } from '@mui/material'
import { getArticles } from '../articles/articles-service'
import { useArticles, useUser } from '../store-articles/store'
import { Login } from '../login/login'

export const Articles = () => {
  const [value, setValue] = useState(0)
  const navigate = useNavigate()
  const setArticles = useArticles(state => state.setArticles)
  const articles = useArticles(state => state.articles)
  const user = useUser(state => state.user)

  useEffect(() => {
    getArticles().then(results => {
      setArticles(results)
    })
  }, [])


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
        <Outlet context={[articles, user.id]} />
      </div>
    </>
  ) : (
    <>
      <div>Load user articles</div>
      <Login />
    </>
  )
}
