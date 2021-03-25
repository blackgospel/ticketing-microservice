import {
  addExpress,
  CurrentUserMiddleware,
  ErrorHandlerMiddleware,
  NotFoundError,
} from '@omnixenon/common'
import { createOrderRouter } from './routes/create-order'
import { deleteOrderRouter } from './routes/delete-order'
import { getAllOrdersByUserIdRouter } from './routes/get-all-orders-by-userid'
import { getOrderByIdRouter } from './routes/get-order-by-id'

const app = addExpress()

app.use(CurrentUserMiddleware)

app.use(createOrderRouter)
app.use(deleteOrderRouter)
app.use(getAllOrdersByUserIdRouter)
app.use(getOrderByIdRouter)

app.use(NotFoundError)
app.use(ErrorHandlerMiddleware)

export default app
