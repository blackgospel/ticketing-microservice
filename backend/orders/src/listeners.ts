import { AWS_EVENTBRIDGE_EVENT_BUS, EventSource } from '@omnixenon/common'
import findRoot from 'find-yarn-workspace-root'

export const orderTicketCreatedListener = {
  handler: `${findRoot()}/backend/orders/src/listener/handler.ticketCreatedListener`,
  events: [
    {
      eventBridge: {
        eventBus: AWS_EVENTBRIDGE_EVENT_BUS,
        pattern: {
          source: [EventSource.TicketCreated],
        },
      },
    },
  ],
}
