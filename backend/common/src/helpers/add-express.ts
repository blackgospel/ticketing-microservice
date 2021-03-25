import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cookieSession from 'cookie-session'
import helmet from 'helmet'
import cors from 'cors'
import { NO_JWT_SECRET } from '../constants/errors'

export default () => {
  if (!process.env.JWT_SECRET) {
    throw new Error(NO_JWT_SECRET)
  }

  let app = express()
  app.set('trust proxy', true)
  app.use(cors())
  app.use(json())
  app.use(cookieSession({ secure: false, signed: false }))
  app.use(helmet())
  return app
}
