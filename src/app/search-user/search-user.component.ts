import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {
  returnUrl: string = ''

  constructor(
    private authService: AuthService,
    private appComponent: AppComponent,
    private route: ActivatedRoute,
    private router: Router,
    private tokenService: TokenStorageService
  ) { }

  users: User[] = [];
  currentUserId: string ='';
  friendId: string='';
  user: User = new User;
  

  ngOnInit(): void {
    this.users = this.appComponent.users;    
    this.user = this.tokenService.getUser();
    this.currentUserId = this.tokenService.getUserId();
    
  }

  addFriend(userId: string){
    this.friendId = userId;   
    console.log(this.currentUserId, this.friendId);
    this.authService.addFriend(this.currentUserId, this.friendId);
    
  }


}
