import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Task, TaskService } from '../../services/task';
import { TaskDialogComponent } from './task-dialog/task-dialog';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatChipsModule,
    MatIconModule,
    DatePipe
  ],
  template: `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
      <h2>Gestión de tareas</h2>
      <button mat-raised-button color="primary" (click)="openCreateDialog()">Nueva tarea</button>
    </div>

    <table mat-table [dataSource]="tasks" class="mat-elevation-z2" style="width: 100%;">
      <ng-container matColumnDef="titulo">
        <th mat-header-cell *matHeaderCellDef>Título</th>
        <td mat-cell *matCellDef="let task">{{ task.titulo }}</td>
      </ng-container>

      <ng-container matColumnDef="descripcion">
        <th mat-header-cell *matHeaderCellDef>Descripción</th>
        <td mat-cell *matCellDef="let task">{{ task.descripcion }}</td>
      </ng-container>

      <ng-container matColumnDef="estado">
        <th mat-header-cell *matHeaderCellDef>Estado</th>
        <td mat-cell *matCellDef="let task">
          <mat-chip [ngStyle]="getChipStyle(task.estado)">
            {{ task.estado }}
          </mat-chip>
        </td>
      </ng-container>

      <ng-container matColumnDef="fecha_creacion">
        <th mat-header-cell *matHeaderCellDef>Fecha creación</th>
        <td mat-cell *matCellDef="let task">{{ task.fecha_creacion | date:'short' }}</td>
      </ng-container>

      <ng-container matColumnDef="acciones">
        <th mat-header-cell *matHeaderCellDef>Acciones</th>
        <td mat-cell *matCellDef="let task">
          <button mat-icon-button color="primary" (click)="openEditDialog(task)">
            <mat-icon>edit</mat-icon>
          </button>

          <button mat-icon-button color="warn" (click)="deleteTask(task.id!)">
            <mat-icon>delete</mat-icon>
          </button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
  `
})
export class TasksComponent implements OnInit {
  private taskService = inject(TaskService);
  private dialog = inject(MatDialog);

  tasks: Task[] = [];
  displayedColumns: string[] = ['titulo', 'descripcion', 'estado', 'fecha_creacion', 'acciones'];

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (data) => this.tasks = data,
      error: (err) => console.error('Error al cargar tareas', err)
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: { mode: 'create' }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taskService.createTask(result).subscribe(() => this.loadTasks());
      }
    });
  }

  openEditDialog(task: Task) {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: { mode: 'edit', task }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && task.id) {
        this.taskService.updateTask(task.id, result).subscribe(() => this.loadTasks());
      }
    });
  }

  deleteTask(id: number) {
    const confirmacion = confirm('¿Deseas eliminar esta tarea?');
    if (!confirmacion) return;

    this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
  }

  getChipStyle(estado: string) {
    if (estado === 'pendiente') {
      return { background: '#ffe082', color: '#000' };
    }

    if (estado === 'en progreso') {
      return { background: '#81d4fa', color: '#000' };
    }

    return { background: '#a5d6a7', color: '#000' };
  }
}
