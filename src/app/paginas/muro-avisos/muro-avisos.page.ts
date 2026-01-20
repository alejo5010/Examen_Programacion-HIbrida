import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { add, trashOutline, chatboxEllipsesOutline } from 'ionicons/icons';

import { PublicacionComunitaria } from '../../modelos/publicacion-comunitaria.model';
import { GestionPublicacionesService } from '../../servicios/gestion-publicaciones.service';
import { TarjetaPublicacionComponent } from '../../componentes/tarjeta-publicacion/tarjeta-publicacion.component';
import { DialogoConfirmacionComponent } from '../../componentes/dialogo-confirmacion/dialogo-confirmacion.component';

@Component({
  selector: 'app-muro-avisos',
  templateUrl: './muro-avisos.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, TarjetaPublicacionComponent]
})
export class MuroAvisosPage implements OnInit {
  listaDeAvisos: PublicacionComunitaria[] = [];

  constructor(
    private gestionService: GestionPublicacionesService,
    private modalCtrl: ModalController
  ) {
    // Solución al error de addIcons: siempre dentro del constructor
    addIcons({ add, trashOutline, chatboxEllipsesOutline });
  }

  async ngOnInit() {
    await this.cargarDatos();
  }

  async ionViewWillEnter() {
    await this.cargarDatos();
  }

  private async cargarDatos() {
    this.listaDeAvisos = await this.gestionService.obtenerPublicaciones();
  }

  async manejarEliminacion(id: string) {
    const modal = await this.modalCtrl.create({
      component: DialogoConfirmacionComponent,
      componentProps: { mensajeCuerpo: '¿Deseas eliminar este aviso permanentemente?' }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();

    if (data === true) {
      this.listaDeAvisos = this.listaDeAvisos.filter(a => a.id !== id);
      await this.gestionService.guardarPublicaciones(this.listaDeAvisos);
    }
  }
}