import { RequireAuthMiddleware } from '@omnixenon/common'
import { getAllOrdersForUserId } from '@root/queries/orders'
import express, { Request, Response } from 'express'

const router = express.Router()

router.get(
  '/api/orders/',
  RequireAuthMiddleware,
  async (req: Request, res: Response) => {
    const userId = req.currentUser?.id
    const orders = await getAllOrdersForUserId(userId!)

    res.status(200).send(orders)
  }
)

export { router as getAllOrdersByUserIdRouter }
