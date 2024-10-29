import { defineStore } from 'pinia';

export const useProyectosStore = defineStore('proyectos', {
  state: () => ({
    proyectos: [] as {
      id: string;
      nombre: string;
      tareas: { id: string; nombre: string; completada: boolean }[];
      progreso: number;
    }[],
  }),
  actions: {
    agregarProyecto(nombreProyecto: string) {
      const proyecto = {
        id: Date.now().toString(),
        nombre: nombreProyecto,
        tareas: [],
        progreso: 0,
      };
      this.proyectos.push(proyecto);
    },
    agregarTarea(idProyecto: string, nombreTarea: string) {
      const proyecto = this.proyectos.find((proyecto) => proyecto.id === idProyecto);
      if (proyecto) {
        proyecto.tareas.push({
          id: Date.now().toString(),
          nombre: nombreTarea,
          completada: false,
          fechaRegistro: new Date().toLocaleString(),
        });
        this.actualizarProgreso(proyecto);
      }
    },
    eliminarTarea(idProyecto: string, idTarea: string) {
      const proyecto = this.proyectos.find((proyecto) => proyecto.id === idProyecto);
      if (proyecto) {
        proyecto.tareas = proyecto.tareas.filter((tarea) => tarea.id !== idTarea);
        this.actualizarProgreso(proyecto);
      }
    },
    actualizarProgreso(proyecto) {
      const totalTareas = proyecto.tareas.length;
      const tareasCompletadas = proyecto.tareas.filter((tarea) => tarea.completada).length;
      proyecto.progreso = totalTareas ? (tareasCompletadas / totalTareas) * 100 : 0;
    }
  }
});

