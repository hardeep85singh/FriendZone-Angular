import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

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
    private router: Router
  ) { }

  users: User[] = [];

  ngOnInit(): void {
    this.users = this.appComponent.users;    
    console.log(this.users);
    // window.location.reload();
  }


}
