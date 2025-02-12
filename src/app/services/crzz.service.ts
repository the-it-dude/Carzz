import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';

import { BehaviorSubject } from 'rxjs';


const TOKEN_NAME: string = "crzz_token"


@Injectable({
  providedIn: 'root'
})
export class CrzzService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  baseUrl:string = "http://localhost:4000";

  constructor(private httpClient : HttpClient) {
    this.loadToken();
  }

  async loadToken() {
    const token = localStorage.getItem(TOKEN_NAME);
    if (token) {
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  get_token() {
    const token: string | null = localStorage.getItem(TOKEN_NAME)
    // Redirect here?
    return token as string
  }

  get_headers() {
    const token: string = this.get_token()
    return new HttpHeaders({"Authorization": "Bearer " + token})
  }

  login(username: string, password: string) {
    return this.httpClient
      .post(this.baseUrl + "/api/token", {"email": username, "password": password})
      .pipe(
        map((data: any) => data.token),
        switchMap((token: string) => {
          console.log(token)
          localStorage.setItem(TOKEN_NAME, token)
          return token
        }),
        tap((_) => {
          this.isAuthenticated.next(true);
        })
      )
  }

  logout() {
    localStorage.removeItem(TOKEN_NAME)
    localStorage.clear()
  }

  load_events() {
    const headers: HttpHeaders = this.get_headers()
    return this.httpClient.get(
      this.baseUrl + "/api/events",
      {
        headers: headers
      }
    ).pipe(
      map((data: any) => data.data)
    )
  }

  load_event(event_id: string) {
    const headers: HttpHeaders = this.get_headers()
    return this.httpClient.get(
      this.baseUrl + "/api/events/" + event_id,
      {
        headers: headers
      }
    ).pipe(
      map((data: any) => data.data)
    )
  }

  create_event(
    event_type: string,
    title: string,
    description: string,
    start_date: string,
    start_time: string,
    location_name: string
  ) {
    const data = {
      event: {
        status: "draft",
        type: event_type,
        title: title,
        description: description,
        start_date: start_date,
        start_time: start_time,
        location_name: location_name,
      }
    }
    const headers = this.get_headers()
    return this.httpClient.post(
      this.baseUrl + "/api/events",
      data,
      {
        headers: headers
      }
    ).pipe(
      map((data: any) => data.data)
    )
  }
}
