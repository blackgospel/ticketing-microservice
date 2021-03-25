import { AWS_EVENTBRIDGE_EVENT_BUS } from '../constants/event-bridge'
import { EventBridge } from 'aws-sdk'

const publishEvent = async (source: string, type: string, data: {}) => {
  const eventBridge = new EventBridge({
    endpoint: 'http://127.0.0.1:4010',
    accessKeyId: 'YOURKEY',
    secretAccessKey: 'YOURSECRET',
    region: 'eu-west-1',
  })

  await eventBridge
    .putEvents({
      Entries: [
        {
          EventBusName: AWS_EVENTBRIDGE_EVENT_BUS,
          Source: source,
          DetailType: type,
          Detail: JSON.stringify({ data }),
        },
      ],
    })
    .promise()
}

export default publishEvent
