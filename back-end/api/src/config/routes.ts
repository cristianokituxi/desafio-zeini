export const routes = {
    auth: {
      serviceUrl: process.env.AUTH_SERVICE_URL,
      endpoints: ['/auth/login',  '/auth/verify',]
    },
    users: {
      serviceUrl: 'http://crud-service:4001',
      endpoints: ['/usuario','/doctor', '/recover']
    },
   
  };
  