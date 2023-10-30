import { Injectable } from '@angular/core';
import { HabitDto } from './habit-dto';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class HabitService {
  apiServerUrl = "http://localhost:8080";

  constructor(private http: HttpClient) {

  }

  public getHabits(): Observable<HabitDto[]> {
    return this.http.get<HabitDto[]>(`${this.apiServerUrl}/habits/all`);
  }

  public setTargetForHabit(habitId: number, target: number, targetPeriod: string): Observable<HabitDto> {
    return this.http.put<HabitDto>(`${this.apiServerUrl}/habits/${habitId}/target`, { target, targetPeriod });
  }

  public incrementHabitProgress(habitId: number): Observable<HabitDto> {
    return this.http.put<HabitDto>(`${this.apiServerUrl}/habits/${habitId}/target/increment`, { "incrementBy": 1 });
  }

  public decrementHabitProgress(habitId: number): Observable<HabitDto> {
    return this.http.put<HabitDto>(`${this.apiServerUrl}/habits/${habitId}/target/decrement`, { "decrementBy": 1 });
  }
}
