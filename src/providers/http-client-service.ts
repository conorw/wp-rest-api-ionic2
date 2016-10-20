import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class HttpClient {
    constructor(private http: Http) {
    }

    headers: Headers;

    addHeader(headerName: string, headerValue: string) {
        if (!this.headers) {
            this.headers = new Headers();
        }
        // (this.requestOptionArgs.headers as Headers).delete(headerName);
        (this.headers).set(headerName, headerValue);
    }

    get(url) {
        return this.http.get(url, {
            headers: this.headers
        });
    }
    post(url, data) {
        return this.http.post(url, data, {
            headers: this.headers
        });
    }
}