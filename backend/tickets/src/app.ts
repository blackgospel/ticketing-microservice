import {
  addExpress,
  CurrentUserMiddleware,
  ErrorHandlerMiddleware,
  NotFoundError,
} from '@omnixenon/common'
import { createTicketRouter } from './routes/create-ticket'
import { getAllTicketsRouter } from './routes/get-all-tickets'
import { getTicketByIdRouter } from './routes/get-ticket-by-id'
import { updateTicketRouter } from './routes/update-ticket'

const app = addExpress()

app.use(CurrentUserMiddleware)

app.use(createTicketRouter)
app.use(getAllTicketsRouter)
app.use(getTicketByIdRouter)
app.use(updateTicketRouter)

app.use(NotFoundError)
app.use(ErrorHandlerMiddleware)

export default app
