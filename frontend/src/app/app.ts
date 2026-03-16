import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule],
  template: `
    <mat-toolbar color="primary">
      <span style="margin-right: 24px;">Task Manager Junior</span>
      <a mat-button routerLink="/tasks">Tareas</a>
      <a mat-button routerLink="/public-api">API Pública</a>
    </mat-toolbar>

    <div class="container">
      <router-outlet />
    </div>
  `,
  styles: [`
    .container {
      padding: 24px;
    }
    a {
      color: white;
      text-decoration: none;
    }
  `]
})
export class AppComponent {}
