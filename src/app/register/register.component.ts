import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(){
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]

    });
  }

  get f() { return this.form.controls; }

  onSubmit(){

    this.submitted = true;
    
    if (this.form.invalid) {
      return;
    }

    this.authService.register(this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        },
        error => {
          this.errorMessage = error.error.message;
          this.isSignUpFailed = true;
        }
      )
  }

}


