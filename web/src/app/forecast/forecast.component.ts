import { Component, OnInit } from '@angular/core'
import { IPlace, PlaceService } from '../services/place.service'
import { NotificationHelper } from '../helpers/notification.helper'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
    selector: 'forcast-cmp',
    moduleId: module.id,
    templateUrl: 'forecast.component.html',
    styleUrls: ['forecast.component.css'],
    providers: [PlaceService, NotificationHelper]
})

export class ForecastComponent implements OnInit {
    private places: IPlace[] = []
    private forecastData: Object = null

    private formData: FormGroup = new FormGroup({
        place: new FormControl('', Validators.required)
    })

    private isLoading: boolean = false

    constructor(private placeService: PlaceService, private notificationHelper: NotificationHelper) {}

    ngOnInit() {
        this.isLoading = true
        this.placeService.index()
            .then(response => this.places = response.data)
            .then(response => this.isLoading = false)
            .catch(err => this.notificationHelper.httpErrorHandler(err))
    }

    onFormSubmit() {
        this.isLoading = true
        this.forecastData = null

        const place = this.formData.get('place').value

        this.placeService.forecast(place.id)
            .then(response => this.forecastData = response.data)
            .catch(err => this.notificationHelper.httpErrorHandler(err))
            .then(response => this.isLoading = false)
    }
}