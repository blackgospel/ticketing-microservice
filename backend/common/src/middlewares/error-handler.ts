import CustomError from '../errors/custom-error'
import NotFoundError from '../errors/not-found'
import { NextFunction, Request, Response } from 'express'

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() })
  }

  console.error(err)

  return res.status(400).send({
    errors: [{ message: err.message || 'Something went wrong' }],
  })
}

export default errorHandler

export const notFoundHandler = async () => {
  throw new NotFoundError()
}
