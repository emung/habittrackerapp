import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabitDto } from '../habit-dto';
import { HabitService } from '../habit.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-habits-container',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './habits-container.component.html',
  styleUrls: ['./habits-container.component.css']
})
export class HabitsContainerComponent {
  habits: HabitDto[] = [];

  constructor(private habitService: HabitService) {
    this.habitService.getHabits().subscribe(
      (habitsResponse: HabitDto[]) => {
        this.habits = habitsResponse;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
