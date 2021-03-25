import 'reflect-metadata'

export default {
  handler: `${__dirname.split(process.cwd())[1].substring(1)}/handler.main`,
  environment: {
    JWT_SECRET: '${ssm:/jwt-secret-development}',
  },
  events: [
    {
      http: {
        method: 'ANY',
        path: 'api/tickets',
        cors: true,
      },
    },
    {
      http: {
        method: 'ANY',
        path: 'api/tickets/{proxy+}',
        cors: true,
      },
    },
  ],
}
