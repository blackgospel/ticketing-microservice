import type { AWS } from '@serverless/typescript'
import emitter from './src/emitter'
import listener from './src/listener'
import { ticketOrderCreatedListener } from '@omnixenon/tickets/src/listeners'

const serverlessConfiguration: AWS = {
  service: 'event-bridge',
  frameworkVersion: '^2.4.0',
  plugins: ['serverless-offline', 'serverless-offline-aws-eventbridge'],
  package: {
    individually: true,
  },
  custom: {
    'serverless-offline-aws-eventbridge': {
      debug: true,
    },
  },
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    eventBridge: {
      useCloudFormation: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
  },
  functions: {
    emitter,
    listener,
    ticketOrderCreatedListener,
  },
}

module.exports = serverlessConfiguration
