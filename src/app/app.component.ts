
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { User } from './models/user';
import { AuthService } from './services/auth.service';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  username?: string;
  users: User[] = [];
  searchUser: string = '';
  returnUrl: string = ''
  searchText: any;

  constructor(
    private tokenStorageService: TokenStorageService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }


  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();

      this.username = user.username;
    }
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  async searchUsers() {
    console.log(this.searchText);
    const data = await this.authService.searchUsers(this.searchText)
    .toPromise();
    this.users = data;

    // this.authService.searchUsers(this.searchText).subscribe(
    //   data => {
    //     console.log(data);
    //     this.users = data;
    //   }
    // )
    this.router.navigate([this.returnUrl + "/searchUser"]);
    
  }

  // routeToSearchPage() {
    // let navigationExtras: NavigationExtras = {
    //   queryParams: this.users
    // };
    // this.router.navigate([this.returnUrl + "/searchUser"], navigationExtras);
  // }


}
