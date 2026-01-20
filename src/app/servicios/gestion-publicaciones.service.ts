import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { PublicacionComunitaria } from '../modelos/publicacion-comunitaria.model';

@Injectable({
  providedIn: 'root' // Esto soluciona el error NG2003 de inyección
})
export class GestionPublicacionesService {
  private readonly LLAVE_STORAGE = 'avisos_comunidad';

  constructor() {}

  async guardarPublicaciones(publicaciones: PublicacionComunitaria[]): Promise<void> {
    await Preferences.set({
      key: this.LLAVE_STORAGE,
      value: JSON.stringify(publicaciones)
    });
  }

  async obtenerPublicaciones(): Promise<PublicacionComunitaria[]> {
    const { value } = await Preferences.get({ key: this.LLAVE_STORAGE });
    return value ? JSON.parse(value) : [];
  }
}