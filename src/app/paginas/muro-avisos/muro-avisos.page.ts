import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 1. Importamos ChangeDetectorRef
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { addIcons } from 'ionicons';
import { add, trashOutline, chatboxEllipsesOutline } from 'ionicons/icons';

import { PublicacionComunitaria } from '../../modelos/publicacion-comunitaria.model';
import { GestionPublicacionesService } from '../../servicios/gestion-publicaciones.service';
import { TarjetaPublicacionComponent } from '../../components/tarjeta-publicacion/tarjeta-publicacion.component';
import { DialogoConfirmacionComponent } from '../../components/dialogo-confirmacion/dialogo-confirmacion.components';

// NOTA: Quitamos FormatoPublicacionPipe de aquí para eliminar el WARNING NG8113.
// El Pipe debe estar importado DENTRO de TarjetaPublicacionComponent, no aquí.

@Component({
  selector: 'app-muro-avisos',
  templateUrl: './muro-avisos.page.html',
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule, 
    RouterModule, 
    TarjetaPublicacionComponent 
  ] 
})
export class MuroAvisosPage implements OnInit {
  listaDeAvisos: PublicacionComunitaria[] = [];

  constructor(
    private gestionService: GestionPublicacionesService,
    private modalCtrl: ModalController,
    private cdr: ChangeDetectorRef // 2. Inyección del detector de cambios
  ) {
    addIcons({ add, trashOutline, chatboxEllipsesOutline });
  }

  ngOnInit() {
    this.cargarDatos();
  }

  // 3. ESTA ES LA CLAVE: Se ejecuta cada vez que la vista se vuelve activa (al volver del formulario)
  async ionViewWillEnter() {
    console.log("Entrando al muro... recargando datos.");
    await this.cargarDatos();
  }

  private async cargarDatos() {
    this.listaDeAvisos = await this.gestionService.obtenerPublicaciones();
    
    // Debug para ver en consola si hay datos
    console.log('Datos recuperados:', this.listaDeAvisos);

    // 4. Forzamos a la pantalla a actualizarse por si se quedó pegada
    this.cdr.detectChanges(); 
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
      // Guardamos la lista vacía/actualizada
      await this.gestionService.guardarPublicaciones(this.listaDeAvisos);
      this.cdr.detectChanges(); // Forzamos actualización visual
    }
  }
}