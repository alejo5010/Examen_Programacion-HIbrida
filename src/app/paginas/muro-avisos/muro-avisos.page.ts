import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { PublicacionComunitaria } from '../../modelos/publicacion-comunitaria.model';
import { GestionPublicacionesService } from '../../servicios/gestion-publicaciones.service';
import { TarjetaPublicacionComponent } from '../../componentes/tarjeta-publicacion/tarjeta-publicacion.component';
import { DialogoConfirmacionComponent } from '../../componentes/dialogo-confirmacion/dialogo-confirmacion.component';
import { addIcons } from 'ionicons';
import { add, trashOutline, chatboxEllipsesOutline } from 'ionicons/icons';

@Component({
  selector: 'app-muro-avisos',
  templateUrl: './muro-avisos.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, TarjetaPublicacionComponent]
})

  export class MuroAvisosPage implements OnInit {
  listaDeAvisos: PublicacionComunitaria[] = [];
  addIcons({ add, trashOutline, chatboxEllipsesOutline });

  constructor(
    private gestionPubService: GestionPublicacionesService,
    private modalCtrl: ModalController
  ) {}

  /**
   * Ciclo de vida: Se ejecuta al inicializar. 
   * Cargamos los datos guardados en Preferences.
   */
  async ngOnInit() {
    await this.obtenerDatosActualizados();
  }

  /**
   * Ciclo de vida Ionic: Se ejecuta cada vez que la vista entra en foco.
   * Ideal para refrescar la lista después de crear un aviso nuevo.
   */
  async ionViewWillEnter() {
    await this.obtenerDatosActualizados();
  }

  private async obtenerDatosActualizados() {
    this.listaDeAvisos = await this.gestionPubService.obtenerPublicaciones();
  }

  /**
   * Maneja el evento de eliminación solicitado por la tarjeta.
   * @param id Identificador único del aviso.
   */
  async manejarEliminacion(id: string) {
    const modal = await this.modalCtrl.create({
      component: DialogoConfirmacionComponent,
      componentProps: { mensajeCuerpo: '¿Deseas quitar este aviso del muro comunitario?' }
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();

    // Si el usuario confirmó (data === true), procedemos a borrar
    if (data) {
      this.listaDeAvisos = this.listaDeAvisos.filter(aviso => aviso.id !== id);
      await this.gestionPubService.guardarPublicaciones(this.listaDeAvisos);
    }
  }
}