import { AWS_EVENTBRIDGE_EVENT_BUS, EventSource } from '@omnixenon/common'
import findRoot from 'find-yarn-workspace-root'

export const ticketOrderCreatedListener = {
  handler: `${findRoot()}/backend/tickets/src/listener/handler.orderCreatedListener`,
  events: [
    {
      eventBridge: {
        eventBus: AWS_EVENTBRIDGE_EVENT_BUS,
        pattern: {
          source: [EventSource.OrderCreated],
        },
      },
    },
  ],
}
