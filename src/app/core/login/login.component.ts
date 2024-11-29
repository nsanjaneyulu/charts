import { Component } from '@angular/core';
import { PanelModule } from 'primeng/panel';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone:true,
  imports:[PanelModule]
})
export class LoginComponent {

}
