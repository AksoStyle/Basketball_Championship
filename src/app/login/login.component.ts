import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { FormControl, Validators ,FormGroup} from '@angular/forms'
import { SnackbarService } from '../shared/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // Values
  loginForm = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required, Validators.minLength(6)])
  })
  

  constructor(private router: Router, private authService: AuthService, private snackbarService: SnackbarService,) { }

  ngOnInit(): void { }

  login() {
    
    if (this.loginForm.valid) {
      try {
        this.authService.login(this.loginForm.get('email')?.value as string, this.loginForm.get('password')?.value as string)
          .then(response => {
            if(response){
              this.snackbarService.show(['Sikeres Bejelentkezés.'], 'green-snackbar');
              this.router.navigateByUrl('/home');
            }
          }).catch(error => {
            console.error('alma', error)
            const errorMessages = [];
            if (error.code === 'auth/wrong-password') {
              errorMessages.push('Nem megfelelő felhasználónév-jelszó páros.');
            } else if (error.code === 'auth/user-not-found') {
              errorMessages.push('Nem létező felhasználónév.');
            } else if (error.code === 'auth/wrong-password') {
              errorMessages.push('Helytelen jelszó, kérlek próbálkozz újra.');
            } else if (error.code === 'auth/too-many-requests') {
              errorMessages.push('Túl sok sikertelen bejelentkezési kísérlet történt, kérlek próbálkozz később.');
            } else if (error.code === 'auth/user-disabled') {
              errorMessages.push('A fiók letiltva, kérlek lépj kapcsolatba az ügyfélszolgálattal.');
            } else if (error.code === 'auth/invalid-email') {
              alert('i')
              errorMessages.push('Nem érvényes e-mail cím!');
            }else {
              errorMessages.push('Ismeretlen hiba történt.');
            }
            this.snackbarService.show(errorMessages, 'red-snackbar');
          });

      } catch (error: any) {
        const errorMessages = [];
        errorMessages.push(error);
        this.snackbarService.show(errorMessages)
      }
    } 
  } 

}