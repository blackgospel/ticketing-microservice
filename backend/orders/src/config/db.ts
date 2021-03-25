import { TypeDynamo } from 'type-dynamo'

const dbConfig = new TypeDynamo({
  accessKeyId: 'xxxxxxxxxxxxxx',
  secretAccessKey: 'xxxxxxxxxxxxxx',
  endpoint: 'http://0.0.0.0:8000',
  region: 'local',
})

export default dbConfig
