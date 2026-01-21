import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { add, trashOutline, chatboxEllipsesOutline } from 'ionicons/icons';

// IMPORTANTE: Verifica que estas rutas existan físicamente
import { PublicacionComunitaria } from '../../modelos/publicacion-comunitaria.model';
import { GestionPublicacionesService } from '../../servicios/gestion-publicaciones.service';
import { TarjetaPublicacionComponent } from '../../components/tarjeta-publicacion/tarjeta-publicacion.component';
import { DialogoConfirmacionComponent } from '../../components/dialogo-confirmacion/dialogo-confirmacion.components';
import { FormatoPublicacionPipe } from '../../pipes/formato-publicacion.pipe';

@Component({
  selector: 'app-muro-avisos',
  templateUrl: './muro-avisos.page.html',
  standalone: true,
  // TarjetaPublicacionComponent DEBE estar aquí para que el HTML lo reconozca
  imports: [IonicModule, CommonModule, TarjetaPublicacionComponent, ] 
})
export class MuroAvisosPage implements OnInit {
  listaDeAvisos: PublicacionComunitaria[] = [];

  constructor(
    private gestionService: GestionPublicacionesService,
    private modalCtrl: ModalController
  ) {
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
      componentProps: { mensajeCuerpo: '¿Deseas eliminar este aviso?' }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();

    if (data === true) {
      this.listaDeAvisos = this.listaDeAvisos.filter(a => a.id !== id);
      await this.gestionService.guardarPublicaciones(this.listaDeAvisos);
    }
  }
}