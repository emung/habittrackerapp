import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Habit } from '../create-habit-dto';




@Component({
  selector: 'app-create-habit-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule
  ],
  templateUrl: './create-habit-dialog.component.html',
  styleUrls: ['./create-habit-dialog.component.css']
})
export class CreateHabitDialogComponent {
  targetPeriods: string[] = [
    "daily", "bidaily", "weekly", "biweekly", "monthly", "bimonthly"
  ];

  habit: Habit = {
    name: "",
    description: "",
    category: "",
    target: 0,
    targetPeriod: "",
    targetProgress: 0
  };

  constructor(
    private dialogRef: MatDialogRef<CreateHabitDialogComponent>,
    private snackBar: MatSnackBar) { }

  getTargetPeriods(): string[] {
    return this.targetPeriods;
  }

  createHabit() {
    if (this.isHabitValid(this.habit))
      this.dialogRef.close(this.habit);
  }

  isHabitValid(verifyHabit: Habit): boolean {
    let isValid = true;
    if (verifyHabit.name.trim().length === 0 ||
      verifyHabit.description.trim().length === 0 ||
      verifyHabit.category.trim().length === 0 ||
      verifyHabit.target === 0) {
      isValid = false;
    }

    return isValid;
  }

  // TODO: add validation for name and description inclusive
  // verification if string is not blank or whitespace only
  // create ca method for this


}
