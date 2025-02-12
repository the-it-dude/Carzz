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
  token = '';
  baseUrl:string = "http://localhost:4000";

  constructor(private httpClient : HttpClient) {
    this.loadToken();
  }

  async loadToken() {
    const token = localStorage.getItem(TOKEN_NAME);
    if (token) {
      this.token = token;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  login(username: string, password: string) {
    return this.httpClient
      .post(this.baseUrl + "/api/token", {"email": username, "password": password})
      .pipe(
        map((data: any) => data.token),
        switchMap((token: string) => {
          console.log(token)
          this.token = token;
          localStorage.setItem(TOKEN_NAME, token)
          return token
        }),
        tap((_) => {
          this.isAuthenticated.next(true);
        })
      )
  }

  logout() {
    localStorage.clear()
  }

  load_events() {
    const token: string | null = localStorage.getItem(TOKEN_NAME)
    return this.httpClient.get(
      this.baseUrl + "/api/events",
      {
        headers: new HttpHeaders({"Authorization": "Bearer " + token})
      }
    ).pipe(
      map((data: any) => data.data)
    )
  }

  load_event(event_id: string) {
    const token : string | null = localStorage.getItem(TOKEN_NAME)
    console.log("loading event")
    return this.httpClient.get(
      this.baseUrl + "/api/events/" + event_id,
      {
        headers: new HttpHeaders({"Authorization": "Bearer " + token})
      }
    ).pipe(
      map((data: any) => data.data)
    )
  }
}
