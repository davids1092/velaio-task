export interface Tarea {
    id:number
    nombreTarea:string,
    fechaLimite:Date,
    estado:boolean,
    personasAsignadas?:Persona[]
}

export  interface Persona {
    nombreCompleto:string,
    edad:number,
    habilidades?:string[]
}