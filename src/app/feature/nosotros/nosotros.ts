import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [],
  templateUrl: './nosotros.html',
  styleUrls: ['./nosotros.scss']
})
export class Nosotros implements OnInit {
  constructor(private title: Title, private meta: Meta) {}

  ngOnInit() {
    // Título de la página
    this.title.setTitle('Biblioteca Web - Nosotros | Conoce nuestra historia');

    // Meta tags de descripción
    this.meta.updateTag({
      name: 'description',
      content: 'En Biblioteca Web, llevamos más de 10 años ofreciendo una amplia colección de libros y recursos educativos con atención personalizada.'
    });

    // Meta tags para Open Graph
    this.meta.updateTag({ property: 'og:title', content: 'Biblioteca Web - Sobre nosotros' });
    this.meta.updateTag({ property: 'og:description', content: 'Conoce la historia de Biblioteca Web, nuestra misión y valores.' });
    this.meta.updateTag({ property: 'og:image', content: 'https://example.com/assets/images/about-og.jpg' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });

    // Meta tags para Twitter Cards
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: 'Biblioteca Web - Sobre nosotros' });
    this.meta.updateTag({ name: 'twitter:description', content: 'Conoce la historia de Biblioteca Web, nuestra misión y valores.' });
    this.meta.updateTag({ name: 'twitter:image', content: 'https://example.com/assets/images/about-og.jpg' });

    // Meta tags de SEO para palabras clave
    this.meta.updateTag({ name: 'keywords', content: 'biblioteca, libros, historia, sobre nosotros, misión, valores, literatura' });
    this.meta.updateTag({ name: 'author', content: 'Biblioteca Web' });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });  // Asegúrate de que los motores de búsqueda indexen esta página
  }
}
