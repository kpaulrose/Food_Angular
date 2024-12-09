import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LOGIN, REGISTER, USER_UPDATE } from '../api/url';

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
    return this.http.post(REGISTER, body); // Ensure REGISTER points to the correct backend route
  }

  update(id:string,name:string,email:string,address:string,password:string){
    const body = {id,name,email,address,password};
    return this.http.put(USER_UPDATE,body);

  }
}
