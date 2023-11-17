import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateHabitDto } from '../create-habit-dto';
import { SharedModule } from '../shared/shared.module';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-create-habit-dialog',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule
  ],
  templateUrl: './create-habit-dialog.component.html',
  styleUrls: ['./create-habit-dialog.component.css']
})
export class CreateHabitDialogComponent {
  targetPeriods: string[] = [
    "daily", "bidaily", "weekly", "biweekly", "monthly", "bimonthly"
  ];

  habit: CreateHabitDto = {
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

  createHabit(): void {
    if (this.isHabitValid()) {
      this.dialogRef.close(this.habit);
    } else {
      this.snackBar.open(`Habit can not be created. Check if any of the habit properties are empty.`, "Close", {
        duration: 5000,
      });
    }
  }

  isHabitValid(): boolean {
    return this.habit.name.trim() !== "" &&
      this.habit.description.trim() !== "" &&
      this.habit.category.trim() !== "" &&
      this.habit.target > 0;
  }
}
