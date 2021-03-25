import { USER_DOES_NOT_EXIST } from '@root/constants/errors'
import { compare } from '@root/helpers/password'
import { getUserByEmail } from '@root/queries/users'
import { ValidateRequestMiddleware, BadRequestError } from '@omnixenon/common'
import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { sign } from 'jsonwebtoken'
import isEmpty from 'lodash.isempty'
import pick from 'lodash.pick'

const router = express.Router()

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').trim().notEmpty().withMessage('Invalid password'),
  ],
  ValidateRequestMiddleware,
  async (req: Request, res: Response) => {
    const { email, password } = req.body

    const existingUser = await getUserByEmail(email)

    if (isEmpty(existingUser)) {
      throw new BadRequestError(USER_DOES_NOT_EXIST)
    }

    if (!(await compare(existingUser.password, password))) {
      throw new BadRequestError(USER_DOES_NOT_EXIST)
    }

    const jwt = sign(
      { id: existingUser.pk, email: existingUser.sk },
      process.env.JWT_SECRET!
    )

    req.session = {
      jwt,
    }

    const response = pick(existingUser, ['pk', 'sk'])

    res.status(200).send(response)
  }
)

export { router as signinRouter }
