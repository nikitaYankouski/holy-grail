import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TokenStorageService } from '../../_services/token-storage.service';
import {AuthService} from '../../_services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  checkoutForm = this.formBuilder.group({
    username: null,
    password: null
  });
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private formBuilder: FormBuilder,
              private tokenStorage: TokenStorageService,
              private authService: AuthService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  // TO DO validation fields
  onSubmit(): void {
    if (this.checkoutForm.valid) {
      this.authService.login(this.checkoutForm.value.username, this.checkoutForm.value.password).subscribe(
        data => {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
        },
        err => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      );
    }
    this.checkoutForm.reset();
  }
}
