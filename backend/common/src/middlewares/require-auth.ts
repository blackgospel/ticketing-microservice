import NotAuthorisedError from '../errors/not-authorised'
import { NextFunction, Request, Response } from 'express'

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.currentUser) {
    throw new NotAuthorisedError()
  }

  next()
}

export default requireAuth
