import { APIGatewayProxyHandler } from 'aws-lambda'
import serverless from 'serverless-http'
import app from './app'

export const main: APIGatewayProxyHandler = serverless(app)
