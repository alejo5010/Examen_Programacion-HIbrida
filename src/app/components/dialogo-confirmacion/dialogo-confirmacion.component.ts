import { Component, Input } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-dialogo-confirmacion',
  templateUrl: './dialogo-confirmacion.component.html',
  standalone: true,
  imports: [IonicModule]
})
export class DialogoConfirmacionComponent {
  /**
   * Recibe un mensaje personalizado para mostrar en el cuerpo del diálogo.
   */
  @Input() mensajeCuerpo: string = '¿Está seguro de que desea eliminar esta publicación?';

  constructor(private modalCtrl: ModalController) {}

  /**
   * Cierra el modal devolviendo 'false' para indicar que se canceló la acción.
   */
  cancelar() {
    return this.modalCtrl.dismiss(false, 'cancel');
  }

  /**
   * Cierra el modal devolviendo 'true' para confirmar la eliminación.
   */
  confirmar() {
    return this.modalCtrl.dismiss(true, 'confirm');
  }
}