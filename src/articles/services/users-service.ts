import type {  User } from '../types/types'

export const getUsers = async (): Promise<User[]> => {
  const response = await fetch('http://localhost:3001/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  return await response.json()
}

export const getUser = async (email: string): Promise<User[]> => {
  const response = await fetch(`http://localhost:3001/users?email=${email}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  return await response.json()
}