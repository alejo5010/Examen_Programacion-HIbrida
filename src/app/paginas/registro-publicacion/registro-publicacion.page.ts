import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { camera, arrowBack, add } from 'ionicons/icons';
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
  fotoCapturada: string | undefined; 

  constructor(
    private fb: FormBuilder,
    private gestionService: GestionPublicacionesService,
    private router: Router
  ) {
    // Registro de iconos para que sean visibles
    addIcons({ camera, arrowBack, add });

    // Instrucción 8: Validaciones de formulario
    this.formularioAviso = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      detalle: ['', [Validators.required, Validators.minLength(20)]]
    });
  }

  // Instrucción 9: Captura de fotografía usando el plugin de la cámara
async tomarFotografia() {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: false,
    resultType: CameraResultType.DataUrl,
    source: CameraSource.Prompt // Cambia a Prompt para probar mejor en web
  });
  this.fotoCapturada = image.dataUrl;

}
  // Instrucción 4 y 6: Guardar con fecha automática y persistencia
 async guardarAviso() {
  if (this.formularioAviso.valid) {
    // 1. Obtener los viejos
    const actuales = await this.gestionService.obtenerPublicaciones();
      
      const nuevo: PublicacionComunitaria = {
      id: Date.now().toString(),
      tituloAviso: this.formularioAviso.value.titulo,
      detalleAviso: this.formularioAviso.value.detalle,
      fechaCreacion: new Date(),
      imagenAdjunta: this.fotoCapturada
      };

      actuales.unshift(nuevo);
      // Instrucción 4: Persistencia de datos
      await this.gestionService.guardarPublicaciones(actuales);
      this.router.navigate(['/muro-avisos']);
    }
  }
}