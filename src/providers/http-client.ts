import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class HttpClient {
  constructor(private http: Http) {
  }
  // property with headers that need injected
  headers: Headers;

  addHeader(headerName: string, headerValue: string) {
    if (!this.headers) {
      this.headers = new Headers();
    }
    // (this.requestOptionArgs.headers as Headers).delete(headerName);
    (this.headers).set(headerName, headerValue);
  }
  // inject the header to every get or post operation
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
