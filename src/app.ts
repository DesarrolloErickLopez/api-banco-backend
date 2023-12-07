// src/app.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Request, Response, NextFunction } from 'express';
const cors = require('cors');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;

  app.use(cors());
  
  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();
  });

  app.setGlobalPrefix('api');
  
  await app.listen(port);

  console.log(`
  𝔻 𝕆 ℕ  
        𝔾 𝔸 𝕃 𝕃 𝔼 𝕋 𝕆 
                       𝕊.𝔸. 𝔻 𝔼 ℂ.𝕍. 🍪
  `);

  console.log(`Servidor escuchando en el puerto ${port}`);
}

bootstrap();
