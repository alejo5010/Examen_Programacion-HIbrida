// Exportamos para que Angular lo reconozca como un módulo
export interface PublicacionComunitaria {
  id: string;
  tituloAviso: string;
  detalleAviso: string;
  fechaCreacion: Date;
  imagenAdjunta?: string; // Opcional, ya que no todos los avisos podrían tener foto
}