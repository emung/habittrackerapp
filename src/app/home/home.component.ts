import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HabitDto } from '../habit-dto';
import { HabitService } from '../habit.service';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  habits: HabitDto[] = [];

  constructor(private habitService: HabitService, private snackBar: MatSnackBar) {

  }
  ngOnInit(): void {
    this.loadHabits();
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

  getHabitCount(): number {
    return this.habits.length;
  }

  getFinishedHabitsCount(): number {
    return this.habits.filter(habit => {
      if (habit.target && habit.targetProgress && habit.target > 0) {
        return habit.targetProgress === habit.target;
      };
      return false;
    }).length;
  }

  getInProgressHabitsCount(): number {
    return this.habits.filter(habit => {
      console.log(habit);
      if (habit.target && habit.targetProgress !== undefined && habit.target > 0) {
        // console.log(habit);
        return habit.targetProgress < habit.target;
      };
      return false;
    }).length;
  }

  getHabitCategoriesCount(): number {
    let categories: string[] = [];
    this.habits.forEach(habit => {
      if (!categories.includes(habit.category)) {
        categories.push(habit.category);
      };
    });
    return categories.length;
  }
}
