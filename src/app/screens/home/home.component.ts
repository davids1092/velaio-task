import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AppMaterialModule } from '../../app_material/app-material';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AppMaterialModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(
    private router : Router
  ){

  }

  ir(path:string){
    console.log('esta naavegando a',path)
    this.router.navigateByUrl(path)
  }
}
