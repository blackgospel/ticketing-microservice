import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda'

export const ticketCreatedListener: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
) => {
  await console.log('hit with the ticket.created source')
  await console.log(event)
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Message Received', event }),
  }
}
