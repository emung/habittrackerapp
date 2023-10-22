import { Routes } from '@angular/router';
import { HabitsContainerComponent } from './habits-container/habits-container.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: "Homepage"
    },
    {
        path: 'habits/all',
        component: HabitsContainerComponent,
        title: "Habits container"
    }
];
