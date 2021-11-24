import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  checkoutForm = this.formBuilder.group({
    username: null,
    password: null,
    email: null,
    phoneNumber: null
  });

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  alert: Alert;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  // TO DO validation fields
  // https://angular.io/guide/form-validation
  onSubmit(): void {
    if (this.checkoutForm.valid) {
      this.authService.register(
        this.checkoutForm.value.username, this.checkoutForm.value.email,
        this.checkoutForm.value.password, this.checkoutForm.value.phoneNumber).subscribe(
        (response: any) => { },
        (error: HttpErrorResponse) => {
          if (error.status == 200) {
            this.isSuccessful = true;
            this.isSignUpFailed = false;
            this.alert = {
              type: AlertType.success,
              message: 'Your registration is successful!'
            };
            this.checkoutForm.reset();
          }
          else {
            this.errorMessage = error.error;
            this.isSignUpFailed = true;
            this.alert = {
              type: AlertType.danger,
              message: this.errorMessage
            };
          }
        }
      );

    }
    // TO DO delete reset (choose some cases)
    // this.checkoutForm.reset();
  }
}

