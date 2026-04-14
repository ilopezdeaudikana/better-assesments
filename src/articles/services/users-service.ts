import { UserApiResponse, type User } from '../types/types'

export const getUsers = async (): Promise<User[]> => {
  const response = await fetch('http://localhost:3001/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const result = await response.json()
  const parsed = UserApiResponse.safeParse(result)
  if (parsed.success) return parsed.data
  else {
    console.log('Error parsing users from API')
    return []
  }
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