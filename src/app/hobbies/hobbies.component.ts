import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentUser;
    this.form = this.formBuilder.group({
      hobbies: ['', Validators.required]
    });
  }

  get f() { return this.form.controls; }

  addHobbies() {

    this.authService.addHobbies(this.currentUser.username, this.f.hobbies.value).subscribe(
      data => {
        console.log(this.form.value);
        // this.tokenStorageService.saveToken(data.accessToken);
        // this.tokenStorageService.saveUser(data);
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );
  }

}