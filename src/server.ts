import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import { fileURLToPath } from 'url';

// Ajuste para ES Module (obteniendo __dirname en módulos ES)
const __dirname = fileURLToPath(new URL('.', import.meta.url)); // Esto reemplaza __dirname

const browserDistFolder = join(__dirname, '../browser'); // Establecer correctamente la ruta al directorio 'browser'

const app = express();

// Crear una nueva instancia de AngularNodeAppEngine sin parámetros adicionales
const angularApp = new AngularNodeAppEngine();

app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

// Agregar prerendering y manejo de rutas dinámicas (como 'detalle/:id')
app.use((req, res, next) => {
  const route = req.url; // Obtener la URL actual

  // Manejo específico para las rutas dinámicas de detalle
  if (route.startsWith('/detalle/')) {
    const id = route.split('/detalle/')[1];  // Obtener el parámetro 'id' desde la URL
    req.params = { id };  // Pasar el parámetro id a la solicitud
  }

  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

export const reqHandler = createNodeRequestHandler(app);
