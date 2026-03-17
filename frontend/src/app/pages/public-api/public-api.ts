import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { PublicApiService, PublicUser } from '../../services/public-api';

@Component({
  selector: 'app-public-api',
  standalone: true,
  imports: [CommonModule, MatCardModule],
templateUrl: './public-api.html',
  styleUrls: ['./public-api.css']
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
