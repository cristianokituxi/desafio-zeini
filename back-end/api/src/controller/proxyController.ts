import axios from 'axios';
import { Request, Response } from 'express';
import { routes } from '../config/routes';

export const proxyRequest = async (req: Request, res: Response) => {
  const { originalUrl, method, body, headers } = req;
  console.log(originalUrl, routes, body);

  // Encontrar o serviço correspondente com base na URL
  const service = Object.values(routes).find(route =>
    route.endpoints.some(endpoint => originalUrl.startsWith(endpoint))

  );

  console.log(service);
  if (!service) {
    return res.status(404).json({ message: 'não tem nehuma rota' });
  }

 
  const serviceUrl = `${service.serviceUrl}${originalUrl}`;
  console.log('Service URL:', serviceUrl);
  console.log('Request Method:', method);
  console.log('Request Body:', body);
  console.log('Request Headers:', req.headers);

  try {
    const response = await axios({
      url: serviceUrl,
      method,
      data: body,
      headers: {
        ...headers,
        'content-length': undefined,
        host: new URL(serviceUrl).host,
      }
    });
    console.log(response.data, 'estou aqui');
    return res.status(response.status).json(response.data);
    
  } catch (error: any) {
    if (error.code === 'ECONNABORTED') {
      console.error('Erro de timeout:', error.message);
      return res.status(504).json({ error: 'Serviço demorou muito para responder' });
    }
    console.error('Erro na requisição:', error.message);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
  
  
};
// passeword
// eeeeeeee