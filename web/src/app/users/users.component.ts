import { Component, OnInit } from '@angular/core'
import { NotificationHelper } from '../helpers/notification.helper'
import { IUser, Role, UserService } from '../services/user.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'

declare interface TableData {
    headerRow: object[];
    dataRows: IUser[][];
}

@Component({
    selector: 'users-cmp',
    moduleId: module.id,
    templateUrl: 'users.component.html',
    providers: [UserService, NotificationHelper]
})

export class UsersComponent implements OnInit {
    public users: TableData

    private formData: FormGroup = new FormGroup({
        name: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        role: new FormControl(Role.Standart, Validators.required)
    })

    private isLoading: boolean = false
    private isEditing: boolean = false
    private formOpened: boolean = false
    private selectedItem: IUser

    constructor(private userService: UserService, private notificationHelper: NotificationHelper) {}

    ngOnInit() {
        this.users = {
            headerRow: [{
                id: 'id',
                label: 'ID',
            }, {
                id: 'name',
                label: 'Ad Soyad'
            }, {
                id: 'email',
                label: 'E-posta Adresi'
            }, {
                id: 'role',
                label: 'Rol'
            }, {
                id: 'created_at',
                label: 'Eklenme Tarihi'
            }],
            dataRows: []
        }

        this.getUsers()
    }

    resetForm() {
        this.formData.reset()
    }

    getUsers() {
        this.isLoading = true
        this.userService.index()
            .then(response => this.users.dataRows = response.data)
            .then(response => this.isLoading = false)
    }

    onFormSubmit() {
        const body = this.formData.getRawValue()

        if (this.isEditing) {
            this.userService.update(this.selectedItem.id, body)
                .then(response => {
                    this.notificationHelper.success(response.message)
                    this.getUsers()
                    this.cancelEditing()
                })
                .catch(err => this.notificationHelper.httpErrorHandler(err))
        } else {
            this.userService.store(body)
                .then(response => {
                    this.notificationHelper.success(response.message)
                    this.getUsers()
                    this.resetForm()
                })
                .catch(err => this.notificationHelper.httpErrorHandler(err))
        }
    }

    editItem(item) {
        this.isEditing = true
        this.selectedItem = item

        this.formData.patchValue({
            name: item.name,
            email: item.name,
            role: item.role
        })
    }

    cancelEditing() {
        this.isEditing = false
        this.formOpened = false
        this.selectedItem = null

        this.resetForm()
    }

    deleteItem(item) {
        this.userService.destroy(item.id)
            .then(response => {
                this.notificationHelper.success(response.message)
                this.getUsers()
            })
            .catch(err => this.notificationHelper.httpErrorHandler(err))
    }
}