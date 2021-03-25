import {
  EventSource,
  publishEvent,
  RequireAuthMiddleware,
  ValidateRequestMiddleware,
} from '@omnixenon/common'
import { saveTicket } from '@root/queries/tickets'
import express, { Request, Response } from 'express'
import { body } from 'express-validator'

const router = express.Router()

router.post(
  '/api/tickets',
  RequireAuthMiddleware,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price').not().isEmpty().withMessage('Price is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
  ],
  ValidateRequestMiddleware,
  async (req: Request, res: Response) => {
    const { title, price } = req.body
    const userId = req.currentUser?.id

    const ticket = await saveTicket(userId!, title, price)

    await publishEvent(EventSource.TicketCreated, 'TicketCreated', {
      id: ticket.pk,
      title: ticket.title,
      price: ticket.price,
      version: ticket.version,
    })

    res.status(201).send(ticket)
  }
)

export { router as createTicketRouter }
