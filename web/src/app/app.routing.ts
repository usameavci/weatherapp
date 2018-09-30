import { Route, Routes } from '@angular/router'

import { AuthComponent } from './auth.component'
import { PageComponent } from './page.component'

import { LoginComponent } from './login/login.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { PlacesComponent } from './places/places.component'
import { ForecastComponent } from './forecast/forecast.component'
import { UsersComponent } from './users/users.component'
import { LogsComponent } from './logs/logs.component'

import { AuthenticatedGuard, GuestGuard } from './guards/authentication.guard'

export const AppRoutes: Routes = [{
    path: '',
    component: PageComponent,
    canActivate: [AuthenticatedGuard],
    children: [{
        path: '',
        pathMatch: 'full',
        component: DashboardComponent
    }, {
        path: 'places',
        component: PlacesComponent
    }, {
        path: 'forecast',
        component: ForecastComponent
    }, {
        path: 'users',
        component: UsersComponent
    }, {
        path: 'logs',
        component: LogsComponent
    }]
}, {
    path: 'auth',
    component: AuthComponent,
    canActivate: [GuestGuard],
    children: [{
        path: 'login',
        component: LoginComponent
    }]
}]