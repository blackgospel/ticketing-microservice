import TicketRepository from '@root/model/tickets'
import dayjs from 'dayjs'
import shortid from 'shortid'
import { contains, match } from 'type-dynamo'

export const saveTicket = async (
  userId: string,
  title: string,
  price: number
) => {
  const ticketId = shortid()
  const { data } = await TicketRepository.save({
    pk: `TICKET#${ticketId}`,
    sk: `TICKET#${ticketId}`,
    title,
    price,
    createdBy: userId,
    createdAt: dayjs().unix(),
    version: 1,
  }).execute()

  return data
}

export const updateTicket = async (
  id: string,
  updates: {
    title?: string
    price?: number
    orderId?: string
  }
) => {
  const versionResponse = await getTicketById(id)

  const { data } = await TicketRepository.update(
    {
      pk: `TICKET#${id}`,
      sk: `TICKET#${id}`,
    },
    {
      ...updates,
      version: +versionResponse.version + 1,
    }
  ).execute()

  return data
}

export const getAllTickets = async () => {
  const { data } = await TicketRepository.find()
    .filter(match('pk', contains('TICKET#')))
    .paginate(50)
    .execute()

  return data
}

export const getTicketById = async (id: string) => {
  const { data } = await TicketRepository.find({
    pk: `TICKET#${id}`,
    sk: `TICKET#${id}`,
  }).execute()

  return data
}
