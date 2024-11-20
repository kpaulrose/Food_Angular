import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LOGIN, REGISTER } from '../api/url';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(LOGIN, body, { withCredentials: true });
  }

  register(name: string, email:string, address:string, password:string) {
    const body = { name, email, address, password };
    console.log(body);
    return this.http.post(REGISTER, body); // Ensure REGISTER points to the correct backend route
  }
}
