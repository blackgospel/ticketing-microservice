export default {
  handler: `${__dirname.split(process.cwd())[1].substring(1)}/handler.main`,
  environment: {
    JWT_SECRET: 'naomishaw',
  },
  events: [
    {
      http: {
        method: 'ANY',
        path: 'api/orders',
        cors: true,
      },
    },
    {
      http: {
        method: 'ANY',
        path: 'api/orders/{proxy+}',
        cors: true,
      },
    },
  ],
}
