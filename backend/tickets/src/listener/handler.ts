import { BadRequestError } from '@omnixenon/common'
import { getTicketById, updateTicket } from '@root/queries/tickets'
import { APIGatewayProxyHandler } from 'aws-lambda'

export const orderCreatedListener: APIGatewayProxyHandler = async (
  event: any
) => {
  await console.log('hit with the order.created source')
  await console.log(event)

  const ticket = await getTicketById(event.detail.data.ticketId)

  if (!ticket) {
    throw new BadRequestError('Ticket not found')
  }

  const updatedTicket = await updateTicket(ticket.pk, {
    orderId: `${event.detail.data.ticketId}${event.detail.data.userId}`,
  })

  console.log(updatedTicket)

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Message Received', event }),
  }
}
