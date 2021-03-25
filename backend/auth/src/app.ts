import {
  addExpress,
  ErrorHandlerMiddleware,
  NotFoundError,
} from '@omnixenon/common'
import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'

const app = addExpress()

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.use(NotFoundError)
app.use(ErrorHandlerMiddleware)

export default app
