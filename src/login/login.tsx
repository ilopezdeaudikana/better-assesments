import { useState } from 'react'
import {
  FormControl,
  Input,
  Button,
  FormHelperText,
  InputLabel,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { getUser } from '../api/api'

import { useUser } from '../store-articles/store'
import { User } from '../articles/types/models'

export const Login = () => {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()
  const setUser = useUser(state => state.setUser)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.currentTarget.value)
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    const users: User[] = await getUser(email)
    setUser(users[0])
    navigate('/articles/mine')
  }

  return (
    <form onSubmit={handleSubmit} data-testid='loginForm'>
      <FormControl>
        <InputLabel htmlFor='email'>Email address</InputLabel>
        <Input
          id='email'
          aria-describedby='helper-text'
          onChange={handleChange}
          required
        />
        <FormHelperText id='helper-text'>Try Sincere@april.biz</FormHelperText>
      </FormControl>
      <Button
        role='button'
        variant='outlined'
        color='primary'
        type='submit'
        disabled={!email}
      >
        Load
      </Button>
    </form>
  )
}
