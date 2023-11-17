import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateHabitDialogComponent } from '../create-habit-dialog/create-habit-dialog.component';
import { EditHabitDialogComponent } from '../edit-habit-dialog/edit-habit-dialog.component';
import { CreateHabitDto } from '../create-habit-dto';
import { HabitDto } from '../habit-dto';
import { HabitService } from '../habit.service';
import { SharedModule } from '../shared/shared.module';


@Component({
  selector: 'app-habits-container',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule
  ],
  templateUrl: './habits-container.component.html',
  styleUrls: ['./habits-container.component.css']
})
export class HabitsContainerComponent implements OnInit {
  habits: HabitDto[] = [];
  createHabit: CreateHabitDto = {
    name: '',
    description: '',
    category: '',
    target: 1,
    targetPeriod: '',
    targetProgress: 0
  };

  ngOnInit(): void {
    this.loadHabits();
  }

  constructor(
    private habitService: HabitService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) {
  }

  openCreateHabitDialog() {
    const dialogRef = this.dialog.open(CreateHabitDialogComponent);

    dialogRef.afterClosed().subscribe(
      (result) => {
        if (!result) {
          return;
        }
        result.targetPeriod = this.transformTargetPeriod(result.targetPeriod);
        this.habitService.createHabit(result).subscribe(newHabit => {
          this.habits.push(newHabit);
          this.snackBar.open(`Habit ${newHabit.name} was created.`, "Close", { duration: 3000 });
        });
      },
      (error: HttpErrorResponse) => {
        this.snackBar.open(error.message, "Close", { duration: 5000 });
      }
    );
  }

  openEditHabitDialog(habit: HabitDto) {
    const dialogRef = this.dialog.open(EditHabitDialogComponent, {
      data: habit
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
        if (!result) {
          return;
        }
        this.habitService.updateHabit(habit.id, result).subscribe(updatedHabit => {
          const index = this.habits.findIndex(h => h.id === habit.id);
          this.habits[index] = updatedHabit;
          this.snackBar.open(`Habit ${updatedHabit.name} was created.`, "Close", { duration: 3000 });
        })
      },
      (error: HttpErrorResponse) => {
        this.snackBar.open(error.message, "Close", { duration: 5000 });
      }
    );
  }

  private loadHabits(): void {
    this.habitService.getHabits().subscribe(
      (habitsResponse: HabitDto[]) => {
        this.habits = habitsResponse;
      },
      (error: HttpErrorResponse) => {
        this.snackBar.open(error.message, "Close", { duration: 5000 });
      }
    );
  }

  onDeleteHabitClick(habitId: number) {
    this.habitService.deleteHabit(habitId).subscribe(() => {
      const habitIndex = this.habits.findIndex(habit => habit.id === habitId);
      if (habitIndex > -1) {
        this.habits.splice(habitIndex, 1);
      }
    },
      (error: HttpErrorResponse) => {
        alert(error.message);
        console.log(error);

      }
    );
  }

  onSetTargetClick(habitId: number) {
    this.habitService.setTargetForHabit(habitId, 10, "DAILY").subscribe(
      (updatedHabit: HabitDto) => {
        // Find the habit in the habits array and update its targetProgress
        const habitIndex = this.habits.findIndex(habit => habit.id === habitId);
        if (habitIndex !== -1) {
          this.habits[habitIndex].target = updatedHabit.target;
          this.habits[habitIndex].targetProgress = 0;
          this.habits[habitIndex].targetPeriod = updatedHabit.targetPeriod;
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  onIncrementClick(habitId: number) {
    this.habitService.incrementHabitProgress(habitId).subscribe(
      (updatedHabit: HabitDto) => {
        // Find the habit in the habits array and update its targetProgress
        const habitIndex = this.habits.findIndex(habit => habit.id === habitId);
        if (habitIndex !== -1) {
          this.habits[habitIndex].targetProgress = updatedHabit.targetProgress;
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onDecrementClick(habitId: number) {
    this.habitService.decrementHabitProgress(habitId).subscribe(
      (updatedHabit: HabitDto) => {
        // Find the habit in the habits array and update its targetProgress
        const habitIndex = this.habits.findIndex(habit => habit.id === habitId);
        if (habitIndex !== -1) {
          this.habits[habitIndex].targetProgress = updatedHabit.targetProgress;
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  isHabitTargetInitialized(target: number | undefined): boolean {
    return target !== undefined && target > 0;
  }

  getProgress(targetProgress: number | undefined, target: number | undefined): number | undefined {
    if (target === undefined || targetProgress === undefined) {
      return;
    }
    return targetProgress * 100 / target;
  }

  transformTargetPeriod(period: string | undefined): string {
    return !period ? "" : period.toUpperCase();
  }

}
