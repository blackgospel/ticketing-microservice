import dbConfig from '@root/config/db'

class Tickets {
  pk: string
  sk: string
  title: string
  price: number
  createdBy: string
  createdAt: number
}

const TicketRepository = dbConfig
  .define(Tickets, {
    tableName: 'table',
    partitionKey: 'pk',
    sortKey: 'sk',
  })
  .getInstance()

export default TicketRepository
