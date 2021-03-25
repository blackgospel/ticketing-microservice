import CustomError from './custom-error'

class NotFoundError extends CustomError {
  statusCode = 404
  reason = 'Not found'

  constructor() {
    super('Route could not be found')
  }

  serializeErrors() {
    return [{ message: this.reason }]
  }
}

export default NotFoundError
