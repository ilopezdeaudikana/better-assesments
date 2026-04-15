import { Card, CardContent } from '@mui/material'
import { Article } from '../../types/types'

export const ArticleCard = (props: { post: Article }) => {
  const { title, body, userName, userEmail } = props.post
  return (
    <Card>
      <CardContent className='text-left'>
        {userName && <h3 data-testid='username'>{userName}{ userEmail ? `- ${userEmail}` : ''}</h3>}
        <p>{title}</p>
        <p>{body}</p>
      </CardContent>
    </Card>
  )
}
