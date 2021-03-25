import { USER_ALREADY_EXISTS } from '@root/constants/errors'
import { getUserByEmail, saveUser } from '@root/queries/users'
import { ValidateRequestMiddleware, BadRequestError } from '@omnixenon/common'
import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { sign } from 'jsonwebtoken'
import isEmpty from 'lodash.isempty'
import pick from 'lodash.pick'

const router = express.Router()

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  ValidateRequestMiddleware,
  async (req: Request, res: Response) => {
    const { email, password } = req.body

    const existingUser = await getUserByEmail(email)

    if (!isEmpty(existingUser)) {
      throw new BadRequestError(USER_ALREADY_EXISTS)
    }

    const newUser = await saveUser(email, password)

    const jwt = sign(
      { id: newUser.pk, email: newUser.sk },
      process.env.JWT_SECRET!
    )

    req.session = {
      jwt,
    }

    const response = pick(newUser, ['pk', 'sk'])

    return res.status(201).send(response)
  }
)

export { router as signupRouter }
