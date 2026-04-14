import type { Request, Response, NextFunction } from 'express'
import type { Article } from '../../src/articles/types/types.js'

const server = 'https://jsonplaceholder.typicode.com'

export const getArticles = async (_: Request, res: Response, __: NextFunction) => {
  const response = await fetch(`${server}/posts`)
  const posts: Article[] = await response.json()
  res.json(posts)
}

export const createArticle = async (req: Request, res: Response, _: NextFunction) => {
  const response = await fetch(`${server}/posts`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
    },
    body: JSON.stringify(req.body),
  })
  const apiPost: { id: number } = await response.json()
  res.json(apiPost)
}
