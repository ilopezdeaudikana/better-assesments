import { ArticleApiResponse, type Article } from '../types/types'

export const createArticle = async (article: Article): Promise<{ id: number }> => {
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
  const result = await response.json()
  const parsed = ArticleApiResponse.safeParse(result)
  if (parsed.success) {
    return parsed.data
  } else {
    console.log('Error parsing API articles')
    return []
  }
}