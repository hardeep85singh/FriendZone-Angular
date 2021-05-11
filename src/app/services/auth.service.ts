import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';


const httOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
    private httpClient: HttpClient
  ) { 
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
  }

  login(username: string, password: string){
    return this.httpClient.post<User>(`${environment.apiUrl}/login`, {
      username, password
    }, httOptions);
  }

  register(user: User){
    return this.httpClient.post<User>(`${environment.apiUrl}/signup`, 
    user,
    httOptions);
  }
}
