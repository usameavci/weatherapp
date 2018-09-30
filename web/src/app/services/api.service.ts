import { map } from 'lodash'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Http, Response, RequestOptions, Headers, ResponseContentType, RequestMethod, URLSearchParams } from '@angular/http'
import { AuthHelper } from '../helpers/auth.helper'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise'

@Injectable()
export class APIService {
    baseUrl: string = 'http://api.weatherapp.test'

    constructor(private http: Http, private router: Router, private authHelper: AuthHelper) {}

    get(url: string, params = {}, headers = {}) {
        return this.request(RequestMethod.Get, url, params, headers)
    }

    post(url: string, body, params = {}, headers = {}) {
        return this.request(RequestMethod.Post, url, params, body, headers)
    }

    put(url: string, body, params = {}, headers = {}) {
        return this.request(RequestMethod.Put, url, params, body, headers)
    }

    delete(url: string, params = {}, headers = {}) {
        return this.request(RequestMethod.Delete, url, params, headers)
    }

    request(method: RequestMethod, url, params: Object = null, body: Object = null, headers: Object = null) {

        const reqParams = new URLSearchParams()
        const reqHeaders = new Headers()

        const reqOptions = new RequestOptions({
            method: method,
            responseType: ResponseContentType.Json
        })

        const authUser = this.authHelper.getUser()

        if (authUser) {
            reqHeaders.append('Authorization', 'Bearer ' + authUser.api_token)
        }

        if (headers) {
            map(headers, (val, key) => reqHeaders.append(key, val))
        }
        reqOptions.headers = reqHeaders

        if (params) {
            map(params, (val, key) => reqParams.append(key, val))
        }
        reqOptions.params = reqParams

        if (body) {
            reqOptions.body = body
        }

        url = this.baseUrl + '/' + url

        return this.http.request(url, reqOptions).toPromise()
            .then(response => Promise.resolve(response.json()))
            .catch(err => {
                if (err.status === 401) {
                    this.authHelper.removeUser()
                    this.router.navigate(['auth', 'login'])
                }

                return Promise.reject(err)
            })
            .catch(err => Promise.reject(err.json()))
    }
}