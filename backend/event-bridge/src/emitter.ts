export default {
  handler: `${__dirname.split(process.cwd())[1].substring(1)}/handler.emitter`,
  events: [
    {
      http: {
        method: 'ANY',
        path: 'emitting',
        cors: true,
      },
    },
  ],
}
