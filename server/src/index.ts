
import createError from 'http-errors'
import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'

import type { Request, Response, NextFunction } from 'express'

import { getPosts } from '../routes/posts.js'
import { getUsers } from '../routes/users.js'
import { getArticles, createArticle } from '../routes/articles.js'

const app = express()
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())

// error handler
app.use(function (err: Error, req: Request, res: Response, _: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err?.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(500).json({ error: err?.message })
})

app.get('/posts', getPosts)
app.get('/users', getUsers)
app.get('/articles', getArticles)
app.post('/article', createArticle)

// catch 404 and forward to error handler
app.use(function (_, __, next: NextFunction) {
  next(createError(404))
})

app.listen(3001, () => console.log('🚀 Server at http://localhost:3001'))
