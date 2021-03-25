import {
  BadRequestError,
  EventSource,
  NotFoundError,
  publishEvent,
  RequireAuthMiddleware,
  ValidateRequestMiddleware,
} from '@omnixenon/common'
import { TICKET_ALREADY_RESERVED } from '@root/constants/errors'
import {
  createOrder,
  getTicketById,
  isTicketReserved,
} from '@root/queries/orders'
import express, { Request, Response } from 'express'
import { body } from 'express-validator'

const router = express.Router()

router.post(
  '/api/orders/',
  RequireAuthMiddleware,
  [body('ticketId').not().isEmpty().withMessage('Ticket ID must be provided')],
  ValidateRequestMiddleware,
  async (req: Request, res: Response) => {
    const { ticketId } = req.body
    const userId = req.currentUser?.id
    const existingTicket = await getTicketById(ticketId)

    if (!existingTicket) {
      throw new NotFoundError()
    }

    if (await isTicketReserved(ticketId)) {
      throw new BadRequestError(TICKET_ALREADY_RESERVED)
    }

    const order = await createOrder(ticketId, userId!)

    await publishEvent(EventSource.OrderCreated, 'OrderCreated', {
      ticketId: order.pk,
      userId: order.sk,
      status: order.status,
    })

    res.status(201).send(order)
  }
)

export { router as createOrderRouter }
