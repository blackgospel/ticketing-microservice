import { EventBridge } from 'aws-sdk'
import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda'
import { AWS_EVENTBRIDGE_EVENT_BUS } from '@omnixenon/common'

export const emitter = async () => {
  try {
    const eventBridge = new EventBridge({
      endpoint: 'http://127.0.0.1:4566',
      accessKeyId: 'YOURKEY',
      secretAccessKey: 'YOURSECRET',
      region: 'us-east-1',
    })

    await eventBridge
      .putEvents({
        Entries: [
          {
            EventBusName: AWS_EVENTBRIDGE_EVENT_BUS,
            Source: 'ticket.created',
            DetailType: 'TicketCreated',
            Detail: `{ "id": "ti493uyoieuiter", "title": "Maroon 5", "price": "20" }`,
          },
        ],
      })
      .promise()
    return { statusCode: 200, body: 'published' }
  } catch (e) {
    console.error(e)
    return { statusCode: 400, body: 'could not publish' }
  }
}

export const listener: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
) => {
  console.log('hi, ive been hit with your love')
  console.log(event)
  return { statusCode: 200, body: JSON.stringify(event) }
}
