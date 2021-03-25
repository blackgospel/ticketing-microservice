import {
  EventSource,
  NotAuthorisedError,
  NotFoundError,
  publishEvent,
  RequireAuthMiddleware,
  ValidateRequestMiddleware,
} from '@omnixenon/common'
import { getTicketById, updateTicket } from '@root/queries/tickets'
import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import isEmpty from 'lodash.isempty'

const router = express.Router()

router.put(
  '/api/tickets/:id',
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
    const userId = req.currentUser?.id
    const { id } = req.params
    const { title, price } = req.body

    const ticket = await getTicketById(id)

    if (isEmpty(ticket)) {
      throw new NotFoundError()
    }

    if (ticket.createdBy !== userId) {
      throw new NotAuthorisedError()
    }

    const updatedTicket = await updateTicket(id, title, price)

    await publishEvent(EventSource.TicketUpdated, 'TicketUpdated', {
      id: updatedTicket.pk,
      title: updatedTicket.title,
      price: updatedTicket.price,
      version: updatedTicket.version,
    })

    res.status(200).send(updatedTicket)
  }
)

export { router as updateTicketRouter }
