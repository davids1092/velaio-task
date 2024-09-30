import { Routes } from '@angular/router';


export const routes: Routes = [
    {
        path:'home',loadComponent: () => import('../app/screens/home/home.component').then(m=>m.HomeComponent)
    },

    {
        path:'crear-tarea',loadComponent: () => import('../app/screens/crear-tarea/crear-tarea.component').then(m=>m.CrearTareaComponent)
    },
    {
        path:'listar-tarea',loadComponent: () => import('../app/screens/listar-tareas/listar-tareas.component').then(m=>m.ListarTareasComponent)
    },
   
    {
        path:'',
        pathMatch:'full',
        redirectTo:'home'
    },
    {
        path:'**',
        pathMatch:'full',
        redirectTo:'home'
    },
    {
        path:'*',
        pathMatch:'full',
        redirectTo:'home'
    }

];
