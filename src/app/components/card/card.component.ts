import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { Alerts } from '../../services/Alerts';
import { Router } from '@angular/router';
import { Tarea } from '../../modelos/models.model';
import { AppMaterialModule } from '../../app_material/app-material';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule,AppMaterialModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() tarea:any = []
  @Output() delete = new EventEmitter<any>();
  @Output() estado = new EventEmitter<any>();

  constructor(
  
  ){

  }
  changeState(tarea:any){
    this.estado.emit(tarea)
  }
  deleteTask(tarea:any){
    this.delete.emit(tarea)
  }

}
