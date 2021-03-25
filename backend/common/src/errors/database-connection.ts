import CustomError from './custom-error'

class DatabaseConnectionError extends CustomError {
  statusCode = 500
  reason = 'Failed to connect to database'

  constructor() {
    super('Failed to connect to database')
  }

  serializeErrors() {
    return [{ message: this.reason }]
  }
}

export default DatabaseConnectionError
