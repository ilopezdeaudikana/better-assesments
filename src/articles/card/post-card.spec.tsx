import { PostCard } from './post-card';
import { render, cleanup, screen } from '@testing-library/react';

afterEach(cleanup);

describe('PostCard component', () => {
  it('should display all the props', async () => {
    render(
      <PostCard
        post={{ userId: 1, title: 'title', body: 'body', username: 'username' }}
      />
    );
    const title = screen.getByText('title');
    const body = screen.getByText('body');
    const username = screen.getByText('username');
    expect(title).toBeInTheDocument();
    expect(body).toBeInTheDocument();
    expect(username).toBeInTheDocument();
  });

  it('should not display any username', async () => {
    render(
      <PostCard
        post={{ userId: 1, title: 'title', body: 'body', username: '' }}
      />
    );
    expect(screen.queryByTestId('username')).toBeNull();
  });
});
