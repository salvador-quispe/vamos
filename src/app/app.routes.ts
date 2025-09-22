import { Routes } from '@angular/router';
import { Inicio } from './feature/inicio/inicio';  // Asegúrate de que el nombre del componente sea correcto
import { Nosotros } from './feature/nosotros/nosotros';  // Asegúrate de que el nombre del componente sea correcto
import { CatalogoComponent } from './feature/catalogo/catalogo';  // Asegúrate de que el nombre sea correcto
import { DetalleComponent } from './feature/detalles/detalles';  // Ruta para el detalle de un libro/producto

export const routes: Routes = [
  {
    path: 'home',  // Ruta de inicio
    component: Inicio  // Componente de inicio
  },
  {
    path: 'nosotros',  // Ruta de nosotros
    component: Nosotros  // Componente de nosotros
  },
  {
    path: 'catalogo',  // Ruta para el catálogo de libros
    component: CatalogoComponent  // Componente para el catálogo
  },
  {
    path: 'detalle/:id',  // Ruta dinámica para el detalle de un libro/producto
    component: DetalleComponent  // Componente de detalles
  },
  {
    path: '',  // Redirección al home cuando no se encuentra una ruta válida
    redirectTo: 'home',
    pathMatch: 'full'
  },
];
