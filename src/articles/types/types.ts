import * as z from 'zod'

const ArticleFromApi = z.object({
  userId: z.number(),
  id: z.number().optional(),
  title: z.string(),
  body: z.string()
})

export type ApiArticle = z.infer<typeof ArticleFromApi>
export type Article = ApiArticle & { userName?: string, userEmail?: string }

export const ArticleApiResponse = z.array(ArticleFromApi)

const UserfromApi = z.object({
  id: z.number(),
  name: z.string(),
  email: z.email()
})

export const UserApiResponse = z.array(UserfromApi)

export type User = z.infer<typeof UserfromApi>
