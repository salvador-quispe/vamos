import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

interface Libro {
  id: number;
  titulo: string;
  autor: string;
  descripcion: string;
  editorial: string;
  año: number;
  genero: string;
  imagen: string;
}

@Component({
  selector: 'app-detalle',
  templateUrl: './detalles.html',
  styleUrls: ['./detalles .scss'],
})
export class DetalleComponent implements OnInit {
  id!: number;
  libro!: Libro | undefined;

  libros: Libro[] = [
    { id: 1, titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', descripcion: 'Una de las obras más importantes de la literatura latinoamericana.', editorial: 'Harper & Row', año: 1967, genero: 'Realismo mágico', imagen: 'https://example.com/cover1.jpg' },
    { id: 2, titulo: 'El Quijote', autor: 'Miguel de Cervantes', descripcion: 'La obra más famosa de la literatura española y universal.', editorial: 'Francisco de Robles', año: 1605, genero: 'Novela clásica', imagen: 'https://example.com/cover2.jpg' },
    { id: 3, titulo: 'La ciudad y los perros', autor: 'Mario Vargas Llosa', descripcion: 'Novela que critica la sociedad militarizada en Lima.', editorial: 'Seix Barral', año: 1963, genero: 'Novela moderna', imagen: 'https://example.com/cover3.jpg' },
  ];

  constructor(private route: ActivatedRoute, private title: Title, private meta: Meta) {}

  ngOnInit() {
    // Obtener el ID del libro desde la ruta
    const id = this.route.snapshot.paramMap.get('id');
    this.libro = this.libros.find(libro => libro.id === Number(id));

    if (this.libro) {
      // Actualizar metatags dinámicamente
      this.title.setTitle(`Biblioteca Web - ${this.libro.titulo}`);
      this.meta.updateTag({ name: 'description', content: this.libro.descripcion });
      this.meta.updateTag({ name: 'keywords', content: `${this.libro.titulo}, ${this.libro.autor}` });
      this.meta.updateTag({ name: 'author', content: 'Biblioteca Web' });

      // Open Graph para redes sociales
      this.meta.updateTag({ property: 'og:title', content: `Biblioteca Web - ${this.libro.titulo}` });
      this.meta.updateTag({ property: 'og:description', content: this.libro.descripcion });
      this.meta.updateTag({ property: 'og:image', content: this.libro.imagen });
      this.meta.updateTag({ property: 'og:type', content: 'website' });
    }
  }
}
