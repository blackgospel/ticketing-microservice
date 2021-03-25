import { OrderStatus } from '@omnixenon/common'
import dbConfig from '@root/config/db'

class Orders {
  pk: string
  sk: string
  status: OrderStatus
  expiresAt: number
  createdAt: number
}

const OrderRepository = dbConfig
  .define(Orders, {
    tableName: 'table',
    partitionKey: 'pk',
    sortKey: 'sk',
  })
  .getInstance()

export default OrderRepository
