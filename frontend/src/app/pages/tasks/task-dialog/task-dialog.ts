import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Task } from '../../../services/task';

@Component({
  selector: 'app-task-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule

  ],
  template: `

    <h2 mat-dialog-title>{{ data.mode === 'edit' ? 'Editar tarea' : 'Nueva tarea' }}</h2>

    <mat-dialog-content>
      <mat-form-field appearance="outline" style="width: 100%; margin-bottom: 12px;">
        <mat-label>Título</mat-label>
        <input matInput [(ngModel)]="task.titulo">
      </mat-form-field>

      <mat-form-field appearance="outline" style="width: 100%; margin-bottom: 12px;">
        <mat-label>Descripción</mat-label>
        <textarea matInput rows="4" [(ngModel)]="task.descripcion"></textarea>
      </mat-form-field>

      <mat-form-field appearance="outline" style="width: 100%;">
        <mat-label>Estado</mat-label>
        <mat-select [(ngModel)]="task.estado">
          <mat-option value="pendiente">Pendiente</mat-option>
          <mat-option value="en progreso">En progreso</mat-option>
          <mat-option value="completada">Completada</mat-option>
        </mat-select>
      </mat-form-field>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button (click)="cerrar()">Cancelar</button>
      <button mat-raised-button color="primary" (click)="guardar()">Guardar</button>
    </mat-dialog-actions>
  `
})
export class TaskDialogComponent {
  task: Task = {
    titulo: '',
    descripcion: '',
    estado: 'pendiente'
  };

  constructor(
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mode: 'create' | 'edit'; task?: Task }
  ) {
    if (data.task) {
      this.task = { ...data.task };
    }
  }

  guardar() {
    this.dialogRef.close(this.task);
  }

  cerrar() {
    this.dialogRef.close();
  }
}
