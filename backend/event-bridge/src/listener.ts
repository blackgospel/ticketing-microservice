import { AWS_EVENTBRIDGE_EVENT_BUS } from '@omnixenon/common'

export default {
  handler: `${__dirname.split(process.cwd())[1].substring(1)}/handler.listener`,
  events: [
    {
      eventBridge: {
        eventBus: AWS_EVENTBRIDGE_EVENT_BUS,
        pattern: {
          source: ['ticket.updated'],
        },
      },
    },
  ],
}
