import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { camera, arrowBack } from 'ionicons/icons';
import { GestionPublicacionesService } from '../../servicios/gestion-publicaciones.service';
import { PublicacionComunitaria } from '../../modelos/publicacion-comunitaria.model';

@Component({
  selector: 'app-registro-publicacion',
  templateUrl: './registro-publicacion.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})
export class RegistroPublicacionPage {
  formularioAviso: FormGroup;
  fotoBase64: string | undefined;

  constructor(
    private fb: FormBuilder,
    private gestionService: GestionPublicacionesService,
    private router: Router
  ) {
    addIcons({ camera, arrowBack });
    this.formularioAviso = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      detalle: ['', [Validators.required, Validators.minLength(20)]]
    });
  }

  async capturarFoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    this.fotoBase64 = image.dataUrl;
  }

  async publicar() {
    if (this.formularioAviso.valid) {
      const actuales = await this.gestionService.obtenerPublicaciones();
      const nuevo: PublicacionComunitaria = {
        id: Date.now().toString(),
        tituloAviso: this.formularioAviso.value.titulo,
        detalleAviso: this.formularioAviso.value.detalle,
        fechaCreacion: new Date(),
        imagenAdjunta: this.fotoBase64
      };
      actuales.unshift(nuevo);
      await this.gestionService.guardarPublicaciones(actuales);
      this.router.navigate(['/muro-avisos']);
    }
  }
}