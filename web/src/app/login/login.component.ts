import { Router } from '@angular/router'
import { Http, Response } from '@angular/http'
import { Component, OnInit } from '@angular/core'
import { AuthService } from '../services/auth.service'
import { AuthHelper } from '../helpers/auth.helper'
import { NotificationHelper } from '../helpers/notification.helper'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
    selector: 'login-cmp',
    moduleId: module.id,
    templateUrl: 'login.component.html',
    providers: [AuthService, AuthHelper, NotificationHelper]
})

export class LoginComponent {
    loginForm: FormGroup = new FormGroup({
        email: new FormControl('root@sample.com', Validators.required),
        password: new FormControl('secret', Validators.required)
    })

    constructor(private authService: AuthService, private authHelper: AuthHelper, private notificationHelper: NotificationHelper, private router: Router) {}

    onLoginFormSubmit() {
        const body = this.loginForm.getRawValue()

        this.authService.login(body)
            .then(response => {
                this.authHelper.setUser(response.user)
                this.router.navigate([''])
            })
            .catch(err => this.notificationHelper.httpErrorHandler(err))
    }
}