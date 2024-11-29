import { Component } from '@angular/core';
import { AuthenticatedLayoutComponent } from './core/layout/authenticated-layout/authenticated-layout.component';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AuthenticatedLayoutComponent, ToastModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public spinner: any;

  constructor() { }

}
