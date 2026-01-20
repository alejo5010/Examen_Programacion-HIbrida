import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { PublicacionComunitaria } from '../../modelos/publicacion-comunitaria.model';

@Component({
  selector: 'app-tarjeta-publicacion',
  templateUrl: './tarjeta-publicacion.component.html',
  styleUrls: ['./tarjeta-publicacion.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormatoFechaClPipe]
})
export class TarjetaPublicacionComponent {
  /**
   * Recibe el objeto de la publicación desde el componente padre (Muro).
   * Se utiliza el operador '!' para indicar que la propiedad será inicializada.
   */
  @Input() publicacionAviso!: PublicacionComunitaria;

  /**
   * Emite un evento hacia el padre cuando se solicita la eliminación.
   * Envía el ID único de la publicación.
   */
  @Output() solicitarEliminacion = new EventEmitter<string>();

  constructor() {}

  /**
   * Método que gatilla la salida del evento hacia el componente superior.
   */
  onEliminarClick() {
    this.solicitarEliminacion.emit(this.publicacionAviso.id);
  }
}