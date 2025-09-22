import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-inicio',  // Usamos el nombre correcto de selector
  standalone: true,
  imports: [],
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.scss']
})
export class Inicio {
  constructor(private title: Title, private meta: Meta) {
    // Título y descripción para la Biblioteca Web
    this.title.setTitle('Biblioteca Web - Inicio');

    this.meta.updateTag({
      name: 'description',
      content: 'Biblioteca Web: Accede a miles de libros y recursos educativos en nuestra plataforma online.'
    });

    this.meta.updateTag({ property: 'og:title', content: 'Biblioteca Web - Inicio' });
    this.meta.updateTag({ property: 'og:description', content: 'Descubre, explora y disfruta de una amplia colección de libros en Biblioteca Web.' });
    this.meta.updateTag({ property: 'og:image', content: 'https://tusitio.com/assets/images/biblioteca-og.jpg' });
  }
}
