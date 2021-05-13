import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  submitted = false;
  returnUrl: string = ''


  constructor(
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    if(this.tokenStorageService.getToken()){
      this.isLoggedIn = true;
    }
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f() { return this.form.controls; }

  onSubmit(): void{
    this.submitted = true;
    this.authService.login(this.f.username.value, this.f.password.value).subscribe(
      data =>{
        this.tokenStorageService.saveToken(data.accessToken);
        this.tokenStorageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.reloadPage();
        // this.router.navigate([this.returnUrl+"/profile"]);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
    this.router.navigate([this.returnUrl+"/profile"]);
  }

  reloadPage(): void {
    window.location.reload();
    
  }

}
