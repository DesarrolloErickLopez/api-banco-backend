import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Request, Response, NextFunction } from 'express';

// Utiliza require para cargar cors
const cors = require('cors');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;

  // Configuración de CORS
  app.use(cors()); // Opciones de CORS se pueden pasar como argumento a cors()

  // Middleware para registrar las solicitudes entrantes
  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();
  });

  app.setGlobalPrefix('api');
  
  await app.listen(port);

  console.log(`
    ██████╗  ██████╗  ██╗   ██╗ ██╗   ██╗ ████████╗ ██╗
    ██╔══██╗ ██╔══██╗ ██║   ██║ ██║   ██║ ╚══██╔══╝ ██║
    ██████╔╝ ██████╔╝ ██║   ██║ ██║   ██║    ██║    ██║
    ██╔══██╗ ██╔══██╗ ╚██╗ ██╔╝ ██║   ██║    ██║    ██║
    ██████╔╝ ██████╔╝  ╚████╔╝  ╚██████╔╝    ██║    ███████╗
    ╚═════╝  ╚═════╝    ╚═══╝    ╚═════╝     ╚═╝    ╚══════╝
  `);

  console.log(`Servidor escuchando en el puerto ${port}`);
}

bootstrap();
