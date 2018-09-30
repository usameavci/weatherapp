import * as moment from 'moment'
import { get, omitBy, isNumber, isEmpty } from 'lodash'
import { Component, OnInit } from '@angular/core'
import { ILog, LogService } from '../services/log.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { NotificationHelper } from '../helpers/notification.helper'
import { IUser, UserService } from '../services/user.service'
import { IPlace, PlaceService } from '../services/place.service'

declare interface TableData {
    headerRow: object[];
    dataRows: ILog[][];
}

@Component({
    selector: 'logs-cmp',
    moduleId: module.id,
    templateUrl: 'logs.component.html',
    providers: [LogService, UserService, PlaceService, NotificationHelper]
})

export class LogsComponent implements OnInit {
    private logs: TableData
    private users: IUser[]
    private places: IPlace[]

    private formData: FormGroup = new FormGroup({
        user_id: new FormControl('', Validators.required),
        place_id: new FormControl('', Validators.required),
        status: new FormControl('', Validators.required),
        executed_at_from: new FormControl('', Validators.required),
        executed_at_to: new FormControl('', Validators.required)
    })

    private isLoading: boolean = false

    constructor(private logService: LogService, private userService: UserService, private placeService: PlaceService, private notificationHelper: NotificationHelper) {}

    ngOnInit() {
        this.logs = {
            headerRow: [{
                id: 'id',
                label: 'ID',
            }, {
                id: 'user.name',
                label: 'Kullanıcı'
            }, {
                id: 'place.name',
                label: 'Lokasyon'
            }, {
                id: 'executed_at',
                label: 'İşlem Tarihi'
            }, {
                id: 'execution_time',
                label: 'Cevap Süresi'
            }, {
                id: 'status',
                label: 'Durumu'
            }],
            dataRows: []
        }

        this.getUsers()
        this.getPlaces()
    }

    getUsers() {
        this.isLoading = true
        this.userService.index()
            .then(response => this.users = response.data)
            .then(response => this.isLoading = false)
            .catch(err => this.notificationHelper.httpErrorHandler(err))
    }

    getPlaces() {
        this.isLoading = true
        this.placeService.index()
            .then(response => this.places = response.data)
            .then(response => this.isLoading = false)
            .catch(err => this.notificationHelper.httpErrorHandler(err))
    }

    onFormSubmit() {
        let params = this.formData.getRawValue()
        console.log(this.formData.getRawValue())

        if (params.executed_at_from) {
            params.executed_at_from = moment(params.executed_at_from).format('YYYY-MM-DD')
        }
        if (params.executed_at_to) {
            params.executed_at_to = moment(params.executed_at_to).format('YYYY-MM-DD')
        }

        params = omitBy(params, (item) => !isNumber(item) && isEmpty(item))

        this.isLoading = true
        this.logService.index(params)
            .then(response => this.logs.dataRows = response.data)
            .then(response => this.isLoading = false)
            .catch(err => this.notificationHelper.httpErrorHandler(err))
            .then(response => this.isLoading = false)
    }

    parseStatus (val) {
        const statuses = {
            success: 'Başarılı',
            failed: 'Başarısız'
        }

        return statuses[val];
    }

    objGet(obj, key) {
        let val = get(obj, key)

        if (key == 'status') {
            val = this.parseStatus(val)
        } else if (key == 'execution_time') {
            val = val + ' ms'
        }

        return val;
    }
}