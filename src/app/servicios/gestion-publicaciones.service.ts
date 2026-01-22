import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences'; // Asegúrate de importar esto
import { PublicacionComunitaria } from '../modelos/publicacion-comunitaria.model';

@Injectable({
  providedIn: 'root'
})
export class GestionPublicacionesService {
  private readonly KEY_STORAGE = 'mis_avisos_guardados';

  async guardarPublicaciones(publicaciones: PublicacionComunitaria[]) {
    // Convierte el array a texto para guardarlo
    await Preferences.set({
      key: this.KEY_STORAGE,
      value: JSON.stringify(publicaciones)
    });
  }

  async obtenerPublicaciones(): Promise<PublicacionComunitaria[]> {
    const { value } = await Preferences.get({ key: this.KEY_STORAGE });
    // Si hay texto, lo convierte a array. Si es null, devuelve array vacío
    return value ? JSON.parse(value) : [];
  }
}