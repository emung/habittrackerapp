import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HabitsContainerComponent } from './habits-container/habits-container.component';

export const routes: Routes = [
    {
        path: '',
        component: AppComponent,
        title: "Homepage"
    },
    {
        path: 'habits/all',
        component: HabitsContainerComponent,
        title: "Habits container"
    }
];
