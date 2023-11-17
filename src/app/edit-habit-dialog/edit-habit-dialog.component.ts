import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HabitDto } from '../habit-dto';
import { HabitService } from '../habit.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UpdateHabitDto } from '../update-habit-dto';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-habit-dialog',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule
  ],
  templateUrl: './edit-habit-dialog.component.html',
  styleUrls: ['./edit-habit-dialog.component.css']
})
export class EditHabitDialogComponent implements OnInit {

  updateHabitDto: UpdateHabitDto = {
    name: '',
    description: ''
  };


  constructor(
    private habitService: HabitService,
    private dialogRef: MatDialogRef<EditHabitDialogComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public habit: HabitDto) {
  }

  ngOnInit(): void {
    this.updateHabitDto.name = this.habit.name;
    this.updateHabitDto.description = this.habit.description;
  }

  updateHabit() {
    if (this.isUpdateHabitValid()) {
      this.dialogRef.close(this.updateHabitDto);
    } else {
      this.snackBar.open(`Habit can not be updated. Check if any of the habit properties are empty.`, "Close", {
        duration: 5000,
      });
    }
  }

  isUpdateHabitValid(): boolean {
    return this.updateHabitDto.name.trim() !== "" && this.updateHabitDto.description.trim() !== "";
  }

}
