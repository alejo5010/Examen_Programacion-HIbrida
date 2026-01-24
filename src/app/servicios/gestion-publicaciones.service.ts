import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences'; // Asegúrate de importar esto
import { PublicacionComunitaria } from '../modelos/publicacion-comunitaria.model';

@Injectable({
  providedIn: 'root'
})
export class GestionPublicacionesService {
  private readonly KEY_STORAGE = 'mis_avisos_guardados';

async guardarPublicaciones(publicaciones: PublicacionComunitaria[]) {
  try {
    const data = JSON.stringify(publicaciones);
    await Preferences.set({
      key: this.KEY_STORAGE,
      value: data
    });
    console.log("Guardado exitoso en LocalStorage:", data);
  } catch (e) {
    console.error("Error guardando datos:", e);
  }
}

  async obtenerPublicaciones(): Promise<PublicacionComunitaria[]> {
    const { value } = await Preferences.get({ key: this.KEY_STORAGE });
    // Si hay texto, lo convierte a array. Si es null, devuelve array vacío
    return value ? JSON.parse(value) : [];
  }
}