import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoPublicacion', // Este es el nombre que usarás en el HTML
  standalone: true
})
export class FormatoPublicacionPipe implements PipeTransform {
  /**
   * Transforma la fecha de la publicación a un formato chileno legible
   */
  transform(value: Date | string | number): string {
    if (!value) return '';
    const fecha = new Date(value);
    return fecha.toLocaleDateString('es-CL', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }
}