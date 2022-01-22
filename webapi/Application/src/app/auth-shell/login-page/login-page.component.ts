import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TokenStorageService } from '../../_services/token-storage.service';
import {AuthService} from '../../_services/auth.service';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  hide = true;

  checkoutForm = this.formBuilder.group({
    username: null,
    password: null
  });
  isLoggedIn = false;
  isLoginFailed = false;
  alert: Alert;
  token: CashflowToken;

  constructor(private formBuilder: FormBuilder,
              private tokenStorage: TokenStorageService,
              private authService: AuthService,
              private router: Router) { }

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
          if (data === null) {
            this.isLoginFailed = true;
            this.alert = {
              type: AlertType.danger,
              message: 'Wrong password or login'
            };
          } else {
            this.token = jwt_decode(data.access_token)
            this.tokenStorage.saveToken(data.access_token);
            this.tokenStorage.saveUser(this.token.sub);

            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.checkoutForm.reset();
            this.router.navigate(['/budget/0']);
          }
        }
        );
    }
  }
}




