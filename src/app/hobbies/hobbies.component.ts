import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-hobbies',
  templateUrl: './hobbies.component.html',
  styleUrls: ['./hobbies.component.css']
})
export class HobbiesComponent implements OnInit {

  currentUser: any = this.tokenStorageService.getUser();
  username: string = this.currentUser.username;
  form: FormGroup = new FormGroup({});
  errorMessage: string = '';
  returnUrl: string='';

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.currentUser;
    this.form = this.formBuilder.group({
      hobbies: [this.getHobbies(), Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.form.controls; }

  addHobbies() {

    this.authService.addHobbies(this.currentUser.username, this.f.hobbies.value).subscribe(
      data => {
        console.log(this.form.value);
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );
    this.router.navigate([this.returnUrl + "/profile"]);
  }

  getHobbies(){
    this.authService.getUser(this.currentUser.username).subscribe(
      response => {
        this.currentUser = response;
        console.log(this.currentUser.hobbies);
      }
    )
  }

}