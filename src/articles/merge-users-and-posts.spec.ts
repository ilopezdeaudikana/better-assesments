import { mergeUsersAndPosts } from './merge-users-and-posts'
import { User, ArticleFromApi, Article } from './types/models'

describe('mergeUsersAndPosts', () => {
  it('Should add user names to posts', async () => {
    const users: User[] = [{ id: 1, name: 'text name' }]
    const apiPosts: ArticleFromApi[] = [
      { id: 5, userId: 1, title: 'title', body: 'body' },
    ]
    const posts: Article[] = mergeUsersAndPosts(users, apiPosts, 5)
    expect(posts).toEqual([
      { id: 5, username: 'text name', userId: 1, title: 'title', body: 'body' },
    ])
  })
})
