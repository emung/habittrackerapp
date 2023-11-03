import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Habit } from '../create-habit-dto';
import { SharedModule } from '../shared/shared.module';




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

  habit: Habit = {
    name: "",
    description: "",
    category: "",
    target: 0,
    targetPeriod: "",
    targetProgress: 0
  };

  constructor(
    private dialogRef: MatDialogRef<CreateHabitDialogComponent>) { }

  getTargetPeriods(): string[] {
    return this.targetPeriods;
  }

  createHabit(): void {
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
}
