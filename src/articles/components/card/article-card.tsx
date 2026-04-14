import { Card, CardContent } from '@mui/material';
import { Article } from '../../types/types';

export const ArticleCard = (props: { post: Article }) => {
  const { title, body, username } = props.post;
  return (
    <Card>
      <CardContent>
        {username && <p data-testid='username'>{username}</p>}
        <p>{title}</p>
        <p>{body}</p>
      </CardContent>
    </Card>
  );
};
