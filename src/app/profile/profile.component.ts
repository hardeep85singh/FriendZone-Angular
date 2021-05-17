import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any = this.tokenStorageService.getUser();
  
  user: User = new User;
  hobbies: string = this.user.hobbies;
  users : User[] = [];

  constructor(
    private tokenStorageService: TokenStorageService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    console.log(this.tokenStorageService.getUserId());
    this.retreiveHobbies();
    this.listAllFriends();

  }

  retreiveHobbies(){
    this.authService.getUser(this.currentUser.username).subscribe(
      response => {
        this.user = response;
        console.log(this.user.hobbies);
        
      }
    )
  }

  listAllFriends(){
    this.authService.getAllFriends(this.tokenStorageService.getUserId()).subscribe(
      data => {
        this.users = data;
        console.log(this.users);
      }
    )
  }

}


