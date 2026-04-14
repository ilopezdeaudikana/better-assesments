import { useState } from 'react'
import {
  FormControl,
  Input,
  Button,
  TextareaAutosize,
  InputLabel,
} from '@mui/material'

import { useArticles } from '../../store/store'
import { createArticle } from '../../services/articles-service'

export const NewPost = (props: { userId: number }) => {
  const { userId } = props
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [visible, setVisible] = useState(false)

  const addNewArticle = useArticles(state => state.setNewArticle)

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.currentTarget.value)
  }

  const handleBodyChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setBody(e.currentTarget.value)
  }

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    const { id } = await createArticle({ title, body, userId })
    addNewArticle({ title, body, userId, id: +id })
  }

  const showForm = () => {
    setVisible(!visible)
  }

  return (
    <>
      <div>
        <Button variant='outlined' color='primary' onClick={() => showForm()}>
          Create new Post
        </Button>
      </div>
      {visible && (
        <form data-testid='form' onSubmit={handleSubmit}>
          <FormControl>
            <InputLabel htmlFor='title'>Title</InputLabel>
            <Input data-testid='title' id='title' onChange={handleTitleChange} />
          </FormControl>
          <FormControl>
            <TextareaAutosize
              id='body'
              data-testid='body'
              aria-label='Post body textarea'
              placeholder='Post body'
              onChange={handleBodyChange}
              minRows={3}
            />
          </FormControl>
          <Button
            role='button'
            data-testid='submit'
            disabled={!title && !body}
            variant='outlined'
            color='primary'
            type='submit'
          >
            Save Post
          </Button>
        </form>
      )}
    </>
  )
}
