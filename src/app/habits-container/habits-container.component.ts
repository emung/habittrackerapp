import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabitDto } from '../habit-dto';
import { HabitService } from '../habit.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-habits-container',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './habits-container.component.html',
  styleUrls: ['./habits-container.component.css']
})
export class HabitsContainerComponent {
  habits: HabitDto[] = [];

  constructor(private habitService: HabitService) {
    this.loadHabits();
  }

  private loadHabits(): void {
    this.habitService.getHabits().subscribe(
      (habitsResponse: HabitDto[]) => {
        this.habits = habitsResponse;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
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

}
