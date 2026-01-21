import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { PublicacionComunitaria } from '../modelos/publicacion-comunitaria.model';

@Injectable({
  providedIn: 'root' 
})
export class GestionPublicacionesService {
  private readonly LLAVE_STORAGE = 'avisos_comunidad';

  constructor() {}

  // Instrucción 4: Guardar datos usando Preferences
  async guardarPublicaciones(publicaciones: PublicacionComunitaria[]): Promise<void> {
    await Preferences.set({
      key: this.LLAVE_STORAGE,
      value: JSON.stringify(publicaciones)
    });
  }

  // Instrucción 4: Obtener datos usando Preferences
  async obtenerPublicaciones(): Promise<PublicacionComunitaria[]> {
    const { value } = await Preferences.get({ key: this.LLAVE_STORAGE });
    return value ? JSON.parse(value) : [];
  }
}