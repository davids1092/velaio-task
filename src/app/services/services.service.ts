import { Injectable } from '@angular/core';
import { Tarea } from '../modelos/models.model';
@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  tareas: any[] = [];

  constructor() {}
  // metodopra guardar tareas en un servicio local
  agregarTarea(tarea: Tarea) {
    console.log('tareaaaaaa', tarea);

    let index = this.tareas.findIndex((x: any) => x.id === tarea.id);
    console.log('index', index);
    if (index != -1) {
      this.tareas[index] = tarea;
    } else {
      tarea.id = this.generateRandomNumber(1, 1000000);
      this.tareas.push(tarea);
    }

    console.log('tarea guardada', this.tareas);
    sessionStorage.setItem('tareas', JSON.stringify(this.tareas));
  }
  // metodo para devolver tareas en un servicio local
  obtenerTareas() {
    if (
      sessionStorage.getItem('tareas') != undefined &&
      sessionStorage.getItem('tareas') != null
    ) {
      this.tareas = JSON.parse(sessionStorage.getItem('tareas')!);
    }
    return this.tareas;
  }

  // metodo para eliminar tareas
  borrarTarea(tarea: Tarea) {
     console.log('eliminando tareas', tarea)
     this.tareas = this.tareas.filter((x: any) => x.id !== tarea.id);
    console.log('eliminando tareas', this.tareas)
    sessionStorage.setItem('tareas', JSON.stringify(this.tareas));
  }

  generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
