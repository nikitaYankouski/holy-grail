import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';

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

  // TO DO
  // for alert
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  // TO DO validation fields
  // https://angular.io/guide/form-validation
  onSubmit(): void {
    if (this.checkoutForm.valid) {
      this.authService.register(
        this.checkoutForm.value.username, this.checkoutForm.value.password,
        this.checkoutForm.value.email, this.checkoutForm.value.phoneNumber).subscribe(
          data => {
            this.isSuccessful = true;
            this.isSignUpFailed = false;
          },
        error => {
          this.errorMessage = error.error.message;
          this.isSignUpFailed = true;
        }
      )
    }
    this.checkoutForm.reset();
  }
}
