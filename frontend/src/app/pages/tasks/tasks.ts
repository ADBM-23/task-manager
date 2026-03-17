import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Task, TaskService } from '../../services/task';
import { TaskDialogComponent } from './task-dialog/task-dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog';

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
  templateUrl: './tasks.html',
  styleUrls: ['./tasks.css']
})
export class TasksComponent implements OnInit {
  private taskService = inject(TaskService);
  private cdr = inject(ChangeDetectorRef);
  private dialog = inject(MatDialog);

  tasks: Task[] = [];
  displayedColumns: string[] = ['titulo', 'descripcion', 'estado', 'fecha_creacion', 'acciones'];

  ngOnInit(): void {
    this.loadTasks();
    this.cdr.detectChanges();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar tareas', err);
      this.cdr.detectChanges();
  }
  });
  }

  openCreateDialog(): void {
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

  openEditDialog(task: Task): void {
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

deleteTask(id: number): void {
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '400px',
    data: {
      title: 'Eliminar tarea',
      message: '¿Deseas eliminar esta tarea? Esta acción no se puede deshacer.'
    }
  });

  dialogRef.afterClosed().subscribe((confirmed) => {
    if (!confirmed) return;

    this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
  });
}

  getChipStyle(estado: string) {
    const estadoNormalizado = estado?.toLowerCase().trim();

    if (estadoNormalizado === 'pendiente') {
      return { background: '#ffe082', color: '#000' };
    }

    if (estadoNormalizado === 'en progreso') {
      return { background: '#81d4fa', color: '#000' };
    }

    return { background: '#a5d6a7', color: '#000' };
  }

  get pendingCount(): number {
    return this.tasks.filter(task => task.estado?.toLowerCase().trim() === 'pendiente').length;
  }

  get inProgressCount(): number {
    return this.tasks.filter(task => task.estado?.toLowerCase().trim() === 'en progreso').length;
  }

  get completedCount(): number {
    return this.tasks.filter(task => task.estado?.toLowerCase().trim() === 'completada').length;
  }
}