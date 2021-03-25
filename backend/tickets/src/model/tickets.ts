import dbConfig from '@root/config/db'

class Tickets {
  pk: string
  sk: string
  title: string
  price: number
  createdBy: string
  createdAt: number
  version: number
  orderId?: string
}

const TicketRepository = dbConfig
  .define(Tickets, {
    tableName: 'table',
    partitionKey: 'pk',
    sortKey: 'sk',
  })
  .withGlobalIndex({
    indexName: 'ticketIndex',
    partitionKey: 'createdBy',
    sortKey: 'pk',
    projectionType: 'ALL',
  })
  .getInstance()

export default TicketRepository
