import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppMaterialModule } from '../app_material/app-material';
import { CommonModule } from '@angular/common';
import { ServicesService } from '../services/services.service';
import { Alerts } from '../services/Alerts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.component.html',
  styleUrls: ['./crear-tarea.component.scss'],
  standalone:true,
  providers:[Alerts],
  imports:[AppMaterialModule,ReactiveFormsModule,FormsModule,CommonModule]
})
export class CrearTareaComponent implements OnInit {
  tareaForm: FormGroup;
  disabled = true
  hoy = new Date()
  constructor(
    private fb: FormBuilder,
    private services: ServicesService,
    private alerts : Alerts,
    private router : Router
  ) {
    this.tareaForm = this.fb.group({
      nombreTarea: ['', Validators.required],
      fechaLimite: ['', Validators.required],
      estado: [false,],
      personasAsignadas: this.fb.array([])
    });

    // this.tareaForm.controls['fechaLimite'].disable()
  }
  ngOnInit(): void {
    this.personasAsignadas.valueChanges.subscribe((personas) => {
      console.log('Personas asignadas:', personas);
      this.personasAsignadas.controls.forEach((control, index) => {
        control.get('nombreCompleto')?.valueChanges.subscribe((nombre: string) => {
          this.verificarNombreDuplicado(nombre, index,control);
        });
      });
    });
  this.agregarPersona()
   
  }

  verificarNombreDuplicado(nombre: string, index: number, control:any): void {
    const personas = this.personasAsignadas.value;
    const existe = personas.some((persona: any, i: number) => {
      return persona.nombreCompleto === nombre && i !== index;
    });
  
    if (existe) {
      this.alerts.alertWarning('Ya haz asignado este nombre ingresa uno diferente')
      control.reset()
      // console.log(`El nombre "${nombre}" ya está asignado a otra persona.`);
      

    } else {
     
      // console.log(`El nombre "${nombre}" está disponible.`);
    }
  }

  // Obtener el FormArray de personas asignadas
  get personasAsignadas(): FormArray {
    return this.tareaForm.get('personasAsignadas') as FormArray;
  }

  // Método para agregar una nueva persona
  nuevaPersona(): FormGroup {
    return this.fb.group({
      nombreCompleto: ['', [Validators.required, Validators.minLength(5)]],
      edad: ['', [Validators.required, Validators.min(18)]],
      habilidades: this.fb.array([this.fb.control('', Validators.required)]) // Al menos una habilidad
    });
  }

  // Método para agregar una nueva habilidad dentro de una persona
  getHabilidades(index: number): FormArray {
    return this.personasAsignadas.at(index).get('habilidades') as FormArray;
  }

  agregarHabilidad(index: number): void {
    this.getHabilidades(index).push(this.fb.control('', Validators.required));
  }

  eliminarHabilidad(indexPersona: number, indexHabilidad: number): void {
    this.getHabilidades(indexPersona).removeAt(indexHabilidad);
  }

  // Agregar una nueva persona al FormArray de personas asignadas
  agregarPersona(): void {
    this.personasAsignadas.push(this.nuevaPersona());
  }

  eliminarPersona(index: number): void {
    this.personasAsignadas.removeAt(index);
  }

  onSubmit(): void {
    console.log(this.tareaForm.value);
   
    this.services.agregarTarea(this.tareaForm.value)
    this.alerts.alertSuccess('Tarea creada exitosamente');
    this.router.navigateByUrl('home')
  }
  ir(path:string){
    this.router.navigateByUrl(path)
  }
}
