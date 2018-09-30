import { NgModule } from '@angular/core'
import { HttpModule } from '@angular/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { AuthComponent } from './auth.component'
import { PageComponent } from './page.component'
import { AppRoutes } from './app.routing'
import { SidebarModule } from './sidebar/sidebar.module'
import { FooterModule } from './shared/footer/footer.module'
import { NavbarModule } from './shared/navbar/navbar.module'
import { SpinnerModule } from './shared/spinner/spinner.module'

import { LoginComponent } from './login/login.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { PlacesComponent } from './places/places.component'
import { ForecastComponent } from './forecast/forecast.component'
import { UsersComponent } from './users/users.component'
import { LogsComponent } from './logs/logs.component'

import { AuthHelper } from './helpers/auth.helper'
import { AuthenticatedGuard, GuestGuard } from './guards/authentication.guard'

@NgModule({
    declarations: [
        AppComponent,
        AuthComponent,
        PageComponent,
        LoginComponent,
        DashboardComponent,
        PlacesComponent,
        ForecastComponent,
        UsersComponent,
        LogsComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        RouterModule.forRoot(AppRoutes),
        SidebarModule,
        NavbarModule,
        FooterModule,
        SpinnerModule
    ],
    providers: [
        AuthHelper,
        GuestGuard,
        AuthenticatedGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}