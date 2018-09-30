import { Component, OnInit } from '@angular/core';
import { AuthHelper } from '../helpers/auth.helper';
import { Role } from '../services/user.service';

declare var $: any;

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/', title: 'Genel Bakış', icon: 'ti-panel', class: '' },
    { path: '/places', title: 'Lokasyonlar', icon: 'ti-map-alt', class: '' },
    { path: '/forecast', title: 'Hava Durumu', icon: 'ti-shine', class: '' },
    { path: '/users', title: 'Kullanıcılar', icon: 'ti-user', class: '' },
    { path: '/logs', title: 'Raporlar', icon: 'ti-pie-chart', class: '' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];

    constructor(private authHelper: AuthHelper) {}

    ngOnInit() {
        const authUser = this.authHelper.getUser()

        this.menuItems = ROUTES.filter(menuItem => {
            if (authUser.role !== Role.Admin && ['/places', '/users'].indexOf(menuItem.path) !== -1) {
                return false;
            }

            return true;
        });
    }
    isNotMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    }

}