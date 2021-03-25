import { NotFoundError } from '@omnixenon/common'
import { getTicketById } from '@root/queries/tickets'
import express, { Request, Response } from 'express'
import isEmpty from 'lodash.isempty'

const router = express.Router()

router.get('/api/tickets/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const ticket = await getTicketById(id)

  if (isEmpty(ticket)) {
    throw new NotFoundError()
  }

  res.status(200).send(ticket)
})

export { router as getTicketByIdRouter }
