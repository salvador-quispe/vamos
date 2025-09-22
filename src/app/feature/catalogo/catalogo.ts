import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Asegúrate de que esté importado
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

// Interfaz para tipado de los libros
interface Libro {
  id: number;
  titulo: string;
  autor: string;
  editorial: string;
  año: number;
  genero: string;
  descripcion: string;
  imagen: string;  // Añadido para la imagen del libro
}

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogo.html',
  styleUrls: ['./catalogo.scss'],
})
export class CatalogoComponent implements OnInit {
  libros: Libro[] = [
    {
      id: 1,
      titulo: 'Cien años de soledad',
      autor: 'Gabriel García Márquez',
      editorial: 'Harper & Row',
      año: 1967,
      genero: 'Realismo mágico',
      descripcion: 'Una de las obras más importantes de la literatura latinoamericana.',
      imagen: 'https://example.com/cover1.jpg'
    },
    {
      id: 2,
      titulo: 'El Quijote',
      autor: 'Miguel de Cervantes',
      editorial: 'Francisco de Robles',
      año: 1605,
      genero: 'Novela clásica',
      descripcion: 'Clásico de la literatura española y universal.',
      imagen: 'https://example.com/cover2.jpg'
    },
    {
      id: 3,
      titulo: 'La ciudad y los perros',
      autor: 'Mario Vargas Llosa',
      editorial: 'Seix Barral',
      año: 1963,
      genero: 'Novela moderna',
      descripcion: 'Novela que critica la sociedad militarizada en Lima.',
      imagen: 'https://example.com/cover3.jpg'
    },
  ];

  constructor(
    private title: Title,
    private meta: Meta,
    private router: Router
  ) {}

  ngOnInit() {
    // Metatags generales de la página
    this.title.setTitle('Biblioteca Web - Catálogo de Libros');
    this.meta.updateTag({
      name: 'description',
      content: 'Explora nuestro catálogo completo de libros: autores, editoriales, géneros y descripciones.',
    });
    this.meta.updateTag({ name: 'keywords', content: 'libros, catálogo, biblioteca, autores, literatura' });
    this.meta.updateTag({ name: 'author', content: 'Biblioteca Web' });

    // Metatags para Open Graph (redes sociales)
    this.meta.updateTag({ property: 'og:title', content: 'Biblioteca Web - Catálogo de Libros' });
    this.meta.updateTag({ property: 'og:description', content: 'Explora nuestro catálogo completo de libros.' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
  }

  verDetalle(id: number) {
    this.router.navigate(['/detalle', id]);  // Redirige a la ruta de detalle del libro
  }
}
