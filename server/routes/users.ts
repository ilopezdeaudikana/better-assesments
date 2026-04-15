import type { Request, Response, NextFunction } from 'express'
import type { User } from '../../src/articles/types/types.js'

const server = 'https://jsonplaceholder.typicode.com'

export const getUsers = async (req: Request, res: Response, _: NextFunction) => {
  const { email } = req.query
  const url = email ? `${server}/users?email=${email}` : `${server}/users`
  const response = await fetch(url)
  const users: User[] = await response.json()
  res.json(users)
}

