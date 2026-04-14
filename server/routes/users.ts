import type { Request, Response, NextFunction } from 'express'
import type { User } from '../../src/articles/types/models.js'

const server = 'https://jsonplaceholder.typicode.com'

export const getUsers = async (req: Request, res: Response, _: NextFunction) => {
  const { email } = req.query
  const url = email ? `${server}/users?email=${email}` : `${server}/users`
  console.log(url)
  const response = await fetch(url)
  const users: User[] = await response.json()
  res.json(users)
}

