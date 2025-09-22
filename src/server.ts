import { AngularNodeAppEngine, createNodeRequestHandler, isMainModule, writeResponseToNodeResponse } from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import { fileURLToPath } from 'url';

// Usar import.meta.url para obtener la ruta del archivo y luego obtener __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '/');  // Esto es lo que reemplaza a __dirname en ES modules

const browserDistFolder = join(__dirname, '../browser');  // Ruta de los archivos de Angular

const app = express();

// Crear la instancia de AngularNodeAppEngine sin pasarle parámetros
const angularApp = new AngularNodeAppEngine();

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  })
);

/**
 * Manejo de rutas dinámicas para prerenderización
 * Cuando se solicita la ruta '/detalle/:id', el parámetro 'id' se extrae de la URL
 */
app.get('/detalle/:id', (req, res, next) => {
  const id = req.params.id;  // Obtener el parámetro 'id' de la URL
  // Aquí, podemos crear el parámetro para la prerenderización
  const prerenderParams = { id };  // Pasamos el parámetro 'id' para prerenderizar la ruta

  // Usamos angularApp para manejar la solicitud
  angularApp
    .handle(req, prerenderParams)  // Pasamos los parámetros para prerenderizar correctamente
    .then((response) => {
      if (response) {
        writeResponseToNodeResponse(response, res);  // Enviar la respuesta prerenderizada
      } else {
        next();
      }
    })
    .catch(next);
});

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the PORT environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
