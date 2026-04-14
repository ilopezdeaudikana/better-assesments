import type { Article } from './types/models'

export const createArticle = async (article: Article): Promise<{ id: string }> => {
  const response = await fetch('http://localhost:3001/articles', {
    method: 'POST',
    body: JSON.stringify({ ...article }),
    headers: {
      'Content-Type': 'application/json',
    }
  })
  return await response.json()
}

export const getArticles = async (): Promise<Article[]> => {
  const response = await fetch('http://localhost:3001/articles', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  return await response.json()
}