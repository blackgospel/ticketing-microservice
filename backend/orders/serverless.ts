import 'reflect-metadata'
import type { AWS } from '@serverless/typescript'
import orders from './src'

const serverlessConfiguration: AWS = {
  service: 'orders',
  frameworkVersion: '^2.4.0',
  plugins: [
    'serverless-plugin-monorepo',
    'serverless-webpack',
    'serverless-jetpack',
    'serverless-offline',
  ],
  package: {
    individually: true,
  },
  custom: {
    'serverless-offline': {
      httpPort: '4002',
      lambdaPort: '5002',
      useChildProcesses: true,
      noPrependStageInUrl: true,
      disableCookieValidation: true,
    },
    jetpack: { trace: true },
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
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
  functions: { orders },
}

module.exports = serverlessConfiguration
