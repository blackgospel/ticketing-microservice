import { CurrentUserMiddleware } from '@omnixenon/common'
import express, { Request, Response } from 'express'

interface UserPayload {
  id: string
  email: string
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload
    }
  }
}

const router = express.Router()

router.get(
  '/api/users/currentuser',
  CurrentUserMiddleware,
  (req: Request, res: Response) => {
    res.send({ currentUser: req.currentUser || null })
  }
)

export { router as currentUserRouter }
