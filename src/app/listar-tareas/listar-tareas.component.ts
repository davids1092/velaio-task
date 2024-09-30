import { Component, OnInit } from '@angular/core';
import { AppMaterialModule } from '../app_material/app-material';
import { CommonModule } from '@angular/common';
import { ServicesService } from '../services/services.service';
import { Alerts } from '../services/Alerts';
import { Router } from '@angular/router';
import { Tarea } from '../modelos/models.model';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from '../components/card/card.component';

@Component({
  selector: 'app-listar-tareas',
  standalone: true,
  imports: [AppMaterialModule,CommonModule,ReactiveFormsModule,FormsModule,CardComponent],
  templateUrl: './listar-tareas.component.html',
  styleUrl: './listar-tareas.component.scss',
  providers:[Alerts]
})
export class ListarTareasComponent implements OnInit {
  tareas:any = []
  filter !:FormControl
  options = [
    {
      key:'1',
      value:'Todas'
    },
    {
      key:'2',
      value:'completas'
    },
    {
      key:'3',
      value:'Pendientes'
    },
  ]
  constructor(
    private services: ServicesService,
    private alerts : Alerts,
    private router : Router
  ){
    this.filter = new FormControl()
   
  }
  ngOnInit(): void {
    
    this.tareas = this.services.obtenerTareas()
    console.log('tareas', this.tareas)

    this.filter.valueChanges.subscribe((x:any)=>{
      let tareas = this.tareas = this.services.obtenerTareas()
      if(x == 3){
        this.tareas = this.tareas.filter((x:any)=> !x.estado)
       }
     if(x == 2){
      this.tareas = this.tareas.filter((x:any)=> x.estado)
     }
     
    } )

    this.filter.setValue('1')
    
  }

ir(path:string){
  this.router.navigateByUrl(path)
}
changeState(tarea:Tarea){
  tarea.estado = !tarea.estado
this.services.agregarTarea(tarea)

this.tareas = this.services.obtenerTareas()
this.filter.reset()
this.filter.setValue('1')
}
deleteTask(tarea:Tarea){

 this.services.borrarTarea(tarea)
this.tareas = this.services.obtenerTareas()
this.filter.reset()
this.filter.setValue('1')
}



}
