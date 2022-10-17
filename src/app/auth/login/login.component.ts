import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../@core/rest/auth.service';
// import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'ngx-adminlogin',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: {};
  loading = false;
  submitted = false;
  logindetails: any;
  showErrorMessage = false;
  success = false;
  error = false;
  successMessage: any;
  errorMessage: any;
  username: any;

  constructor(
    // private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient,
    private api: AuthService,
    public ngform: NgForm,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    });
    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/pages/events';
    // }
  }
  validation_messages = {
    'username': [
      { type: 'required', message: 'Username is required.' },
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
    ],

  };

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.showErrorMessage = false;

    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;

    if (this.loginForm.invalid) {
      this.showErrorMessage = true;
      this.error = true;
    } else {
      this.user = {
        'username': username,
        'password': password,
      };
      this.loading = true;
      this.api.login(this.user).subscribe((result: any) => {
        if (result.response.status === 'success') {
          this.success = true;
          this.successMessage = 'Login Succesful';
          const userData = result.data;
          localStorage.setItem('sessionUser', JSON.stringify(result.data));
          const currentUser = JSON.parse(localStorage.getItem('sessionUser'));
          if (currentUser.role === 'superadmin') {
            this.router.navigate(['pages/iot-dashboard']);
          } else if (currentUser.role === 'admin') {
            this.router.navigate(['pages/dashboard']);
          }
        } else {
          this.showErrorMessage = true;
          this.error = true;
          this.errorMessage = 'Please Try Again with Correct Credentials!!';
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      });
    }
  }
}
