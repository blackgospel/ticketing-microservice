import { NotAuthorisedError, NotFoundError } from '@omnixenon/common'
import { getOrderById } from '@root/queries/orders'
import express, { Request, Response } from 'express'

const router = express.Router()

router.get('/api/orders/:id', async (req: Request, res: Response) => {
  const ticketId = req.params.id
  const userId = req.currentUser?.id
  const order = await getOrderById(ticketId, userId!)

  if (!order) {
    throw new NotFoundError()
  }

  if (order.sk !== userId) {
    throw new NotAuthorisedError()
  }

  res.status(200).send(order)
})

export { router as getOrderByIdRouter }
