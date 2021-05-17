import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { User } from '../models/user';


const httpOptions = {
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
    }, httpOptions);
  }

  register(user: User){
    return this.httpClient.post<User>(`${environment.apiUrl}/signup`, 
    user,
    httpOptions);
  }

  addHobbies(username: string, hobbies: string){
    return this.httpClient.post<User>(`${environment.apiUrl}/hobbies`, {
    username, hobbies }, httpOptions);
  }

  getUser(username: string){
    return this.httpClient.get<User>(`${environment.apiUrl}/${username}`);
  }

  getAllUsers(){
    return this.httpClient.get<User[]>(`${environment.apiUrl}/users`);
  }

  searchUsers(searchUser: string){
    return this.httpClient.get<User[]>(`${environment.apiUrl}/searchUser/${searchUser}`);
  }

  
  addFriend(userId: string, friendId: string){

    let usermap: any= new Map();
    usermap.set("userId", userId);
    usermap.set("friendId", friendId);
    console.log(usermap);

    const convmap : any= {};
    usermap.forEach((val: string, key: string)=>{
      convmap[key] = val;
    });
    return this.httpClient.post<string>(`${environment.apiUrl}/friends`, 
    convmap, httpOptions).subscribe(
      next => console.log('next: ' + next),
      error => console.log('error: ' + error),
      () => console.log('complete')
    );

  }

  getAllFriends(userId: string){
    return this.httpClient.get<User[]> (`${environment.apiUrl}/friends/${userId}`, 
    httpOptions);
  }

}
