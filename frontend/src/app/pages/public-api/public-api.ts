import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { PublicApiService, PublicUser } from '../../services/public-api';

@Component({
  selector: 'app-public-api',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <h2>Consumo de API pública</h2>
    <p>Usuarios obtenidos desde jsonplaceholder</p>

    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:16px;">
      <mat-card *ngFor="let user of users">
        <mat-card-title>{{ user.name }}</mat-card-title>
        <mat-card-content>
          <p><strong>Email:</strong> {{ user.email }}</p>
          <p><strong>Teléfono:</strong> {{ user.phone }}</p>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class PublicApiComponent implements OnInit {
  private publicApiService = inject(PublicApiService);
  private cdr = inject(ChangeDetectorRef);
  users: PublicUser[] = [];

  ngOnInit(): void {
    this.publicApiService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al consumir API pública', err);
      this.cdr.detectChanges();
      }
    });
  }
}
