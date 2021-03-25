import CustomError from './custom-error'

class NotAuthorisedError extends CustomError {
  statusCode = 401
  reason = 'Not authorised'

  constructor() {
    super("User isn't authorised to access this service")
  }

  serializeErrors() {
    return [{ message: this.reason }]
  }
}

export default NotAuthorisedError
