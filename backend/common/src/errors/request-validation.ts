import { ValidationError } from 'express-validator'
import CustomError from './custom-error'

class RequestValidationError extends CustomError {
  statusCode = 400

  constructor(public errors: ValidationError[]) {
    super('Validation error from express-validator')
  }

  serializeErrors() {
    return this.errors.map(({ msg, param }) => {
      return { message: msg, field: param }
    })
  }
}

export default RequestValidationError
