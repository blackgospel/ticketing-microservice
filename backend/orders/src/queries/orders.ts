import { OrderStatus } from '@omnixenon/common'
import OrderRepository from '@root/model/orders'
import TicketRepository from '@root/model/tickets'
import dayjs from 'dayjs'
import isEmpty from 'lodash.isempty'
import { contains, isEqualTo, isNotEqualTo, match } from 'type-dynamo'

export const getTicketById = async (id: string) => {
  const { data } = await TicketRepository.find({
    pk: `TICKET#${id}`,
    sk: `TICKET#${id}`,
  }).execute()

  return data
}

export const isTicketReserved = async (id: string) => {
  const { data } = await OrderRepository.find()
    .filter(
      match('pk', isEqualTo(`TICKET#${id}`))
        .and.attributeExists('status')
        .and.match('status', isNotEqualTo(OrderStatus.Cancelled))
    )
    .allResults()
    .execute()

  console.log(data)

  return !isEmpty(data)
}

export const createOrder = async (ticketId: string, userId: string) => {
  const { data } = await OrderRepository.save({
    pk: `TICKET#${ticketId}`,
    sk: userId,
    status: OrderStatus.Created,
    expiresAt: dayjs().add(15, 'minute').unix(),
    createdAt: dayjs().unix(),
  }).execute()

  return data
}

export const getAllOrdersForUserId = async (userId: string) => {
  const { data } = await OrderRepository.find()
    .filter(match('pk', contains('TICKET#')).and.match('sk', isEqualTo(userId)))
    .paginate(50)
    .execute()

  return data
}

export const getOrderById = async (ticketId: string, userId: string) => {
  const { data } = await OrderRepository.find()
    .filter(
      match('pk', isEqualTo(`TICKET#${ticketId}`)).and.match(
        'sk',
        isEqualTo(userId)
      )
    )
    .allResults()
    .execute()

  const [order] = data

  return order
}

export const cancelOrder = async (id: string, userId: string) => {
  const { data } = await OrderRepository.update(
    {
      pk: `TICKET#${id}`,
      sk: userId,
    },
    { status: OrderStatus.Cancelled }
  ).execute()

  return data
}
