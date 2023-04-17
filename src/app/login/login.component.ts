import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms'
import { SnackbarService } from '../shared/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // Values
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);

  constructor(private router: Router, private authService: AuthService,private snackbarService: SnackbarService,) { }

  ngOnInit(): void { }

  async login() {
    if (this.email.value && this.password.value) {
      this.authService.login(this.email.value, this.password.value).then(cred => {
        this.snackbarService.show(['Sikeres Bejelentkezés.'], 'green-snackbar');
        this.router.navigateByUrl('/home');
      }).catch(error => {
        this.snackbarService.show(['Nem megfelelő adatok!'], 'red-snackbar');
      });
    } else {
      alert('Nincs kitöltve minden mező!');
    }
  }
}