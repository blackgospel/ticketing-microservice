import 'reflect-metadata'
import type { AWS } from '@serverless/typescript'
import tickets from './src'

const serverlessConfiguration: AWS = {
  service: 'tickets',
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
      httpPort: '4001',
      lambdaPort: '5001',
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
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
    deploymentBucket: {
      name: 'deployment-bucket',
    },
  },
  functions: { tickets },
}

module.exports = serverlessConfiguration
