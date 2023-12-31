import { Injectable } from '@angular/core';
import { HabitDto } from './habit-dto';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CreateHabitDto } from './create-habit-dto';
import { UpdateHabitDto } from './update-habit-dto';



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

  public createHabit(habit: CreateHabitDto): Observable<HabitDto> {
    return this.http.post<HabitDto>(`${this.apiServerUrl}/habits`, habit);
  }

  public updateHabit(habitId: number, habit: UpdateHabitDto): Observable<HabitDto> {
    return this.http.put<HabitDto>(`${this.apiServerUrl}/habits/${habitId}`, habit);
  }

  public deleteHabit(habitId: number): Observable<any> {
    return this.http.delete(`${this.apiServerUrl}/habits/${habitId}`, { responseType: 'text' })
  }

  public incrementHabitProgress(habitId: number): Observable<HabitDto> {
    return this.http.put<HabitDto>(`${this.apiServerUrl}/habits/${habitId}/target/increment`, { "incrementBy": 1 });
  }

  public decrementHabitProgress(habitId: number): Observable<HabitDto> {
    return this.http.put<HabitDto>(`${this.apiServerUrl}/habits/${habitId}/target/decrement`, { "decrementBy": 1 });
  }
}
