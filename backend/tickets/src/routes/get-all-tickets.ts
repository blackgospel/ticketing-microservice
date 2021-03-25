import { getAllTickets } from '@root/queries/tickets'
import express, { Request, Response } from 'express'

const router = express.Router()

router.get('/api/tickets/', async (req: Request, res: Response) => {
  const tickets = await getAllTickets()

  res.status(200).send(tickets)
})

export { router as getAllTicketsRouter }
