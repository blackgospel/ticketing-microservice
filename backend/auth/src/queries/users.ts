import { toHash } from '@root/helpers/password'
import UserRepository from '@root/model/user'
import dayjs from 'dayjs'
import shortid from 'shortid'

export const getUserByEmail = async (email: string) => {
  const { data } = await UserRepository.onIndex.authIndex
    .find({
      sk: `EMAIL#${email}`,
    })
    .allResults()
    .execute()

  const [user] = data

  return user
}

export const saveUser = async (email: string, password: string) => {
  const { data } = await UserRepository.save({
    pk: `USER#${shortid()}`,
    sk: `EMAIL#${email}`,
    password: await toHash(password),
    createdAt: dayjs().unix(),
  }).execute()

  return data
}
