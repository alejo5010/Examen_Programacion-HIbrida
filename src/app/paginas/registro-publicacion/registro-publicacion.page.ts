import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { GestionPublicacionesService } from '../../servicios/gestion-publicaciones.service';
import { PublicacionComunitaria } from '../../modelos/publicacion-comunitaria.model';

@Component({
  selector: 'app-registro-publicacion',
  templateUrl: './registro-publicacion.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})
export class RegistroPublicacionPage implements OnInit {
  formularioAviso: FormGroup;
  fotoCapturada: string | undefined;

  constructor(
    private fb: FormBuilder,
    private gestionPubService: GestionPublicacionesService,
    private router: Router
  ) {
    // Definición del Formulario Reactivo con validaciones solicitadas
    this.formularioAviso = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      detalle: ['', [Validators.required, Validators.minLength(20)]]
    });
  }

  ngOnInit() {}

  /**
   * Uso del Plugin Capacitor Camera (Requerimiento 6)
   */
  async tomarFotografia() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl, // Formato Base64 para persistencia simple
      source: CameraSource.Camera
    });
    this.fotoCapturada = image.dataUrl;
  }

  /**
   * Procesa el guardado de la publicación
   */
  async guardarAviso() {
    if (this.formularioAviso.invalid) return;

    const nuevasPublicaciones = await this.gestionPubService.obtenerPublicaciones();
    
    const nuevoAviso: PublicacionComunitaria = {
      id: Date.now().toString(), // ID único basado en timestamp
      tituloAviso: this.formularioAviso.value.titulo,
      detalleAviso: this.formularioAviso.value.detalle,
      fechaCreacion: new Date(),
      imagenAdjunta: this.fotoCapturada
    };

    nuevasPublicaciones.unshift(nuevoAviso); // Agregar al inicio de la lista
    await this.gestionPubService.guardarPublicaciones(nuevasPublicaciones);
    
    this.router.navigate(['/muro-avisos']); // Volver al muro
  }
}