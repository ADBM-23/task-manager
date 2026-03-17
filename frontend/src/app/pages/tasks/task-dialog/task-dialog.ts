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
  templateUrl: './task-dialog.html',
  styleUrls: ['./task-dialog.css']
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

  guardar(): void {
    this.task.titulo = this.formatTitle(this.task.titulo);
    this.dialogRef.close(this.task);
  }

  cerrar(): void {
    this.dialogRef.close();
  }

  private formatTitle(value: string): string {
    if (!value) return '';
    const limpio = value.trim();
    return limpio.charAt(0).toUpperCase() + limpio.slice(1);
  }
}