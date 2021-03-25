import {
  EventSource,
  NotAuthorisedError,
  NotFoundError,
  publishEvent,
  RequireAuthMiddleware,
} from '@omnixenon/common'
import { cancelOrder, getOrderById } from '@root/queries/orders'
import express, { Request, Response } from 'express'
import isEmpty from 'lodash.isempty'

const router = express.Router()

router.delete(
  '/api/orders/:id',
  RequireAuthMiddleware,
  async (req: Request, res: Response) => {
    const { id } = req.params
    const userId = req.currentUser?.id

    const order = await getOrderById(id, userId!)

    if (isEmpty(order)) {
      throw new NotFoundError()
    }

    if (order.sk !== userId) {
      throw new NotAuthorisedError()
    }

    const formattedOrder = await cancelOrder(id, userId)

    await publishEvent(EventSource.OrderCancelled, 'OrderCancelled', {
      ticketId: order.pk,
      userId: order.sk,
      status: order.status,
    })

    res.status(204).send(formattedOrder)
  }
)

export { router as deleteOrderRouter }
