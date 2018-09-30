import { Component, OnInit } from '@angular/core'
import { NotificationHelper } from '../helpers/notification.helper'
import { IPlace, PlaceService } from '../services/place.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'

declare interface TableData {
    headerRow: object[];
    dataRows: IPlace[][];
}

@Component({
    selector: 'places-cmp',
    moduleId: module.id,
    templateUrl: 'places.component.html',
    providers: [PlaceService, NotificationHelper]
})

export class PlacesComponent implements OnInit {
    private places: TableData

    private formData: FormGroup = new FormGroup({
        name: new FormControl('', Validators.required)
    })

    private isLoading: boolean = false
    private isEditing: boolean = false
    private formOpened: boolean = false
    private selectedItem: IPlace

    constructor(private placeService: PlaceService, private notificationHelper: NotificationHelper) {}

    ngOnInit() {
        this.places = {
            headerRow: [{
                id: 'id',
                label: 'ID',
            }, {
                id: 'name',
                label: 'Lokasyon Adı'
            }, {
                id: 'created_at',
                label: 'Eklenme Tarihi'
            }],
            dataRows: []
        }

        this.getPlaces()
    }

    resetForm() {
        this.formData.reset()
    }

    getPlaces() {
        this.isLoading = true
        this.placeService.index()
            .then(response => this.places.dataRows = response.data)
            .then(response => this.isLoading = false)
    }

    onFormSubmit() {
        const body = this.formData.getRawValue()

        if (this.isEditing) {
            this.placeService.update(this.selectedItem.id, body)
                .then(response => {
                    this.notificationHelper.success(response.message)
                    this.getPlaces()
                    this.cancelEditing()
                })
                .catch(err => this.notificationHelper.httpErrorHandler(err))
        } else {
            this.placeService.store(body)
                .then(response => {
                    this.notificationHelper.success(response.message)
                    this.getPlaces()
                    this.resetForm()
                })
                .catch(err => this.notificationHelper.httpErrorHandler(err))
        }
    }

    editItem(item) {
        this.isEditing = true
        this.selectedItem = item

        this.formData.patchValue({
            name: item.name
        })
    }

    cancelEditing() {
        this.isEditing = false
        this.formOpened = false
        this.selectedItem = null

        this.resetForm()
    }

    deleteItem(item) {
        this.placeService.destroy(item.id)
            .then(response => {
                this.notificationHelper.success(response.message)
                this.getPlaces()
            })
            .catch(err => this.notificationHelper.httpErrorHandler(err))
    }
}