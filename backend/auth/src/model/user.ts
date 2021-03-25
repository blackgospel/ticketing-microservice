import dbConfig from '@root/config/db'

class User {
  pk: string
  sk: string
  password: string
  createdAt: number
}

const UserRepository = dbConfig
  .define(User, {
    tableName: 'table',
    partitionKey: 'pk',
    sortKey: 'sk',
  })
  .withGlobalIndex({
    indexName: 'authIndex',
    partitionKey: 'sk',
    sortKey: 'pk',
    projectionType: 'ALL',
  })
  .getInstance()

export default UserRepository
