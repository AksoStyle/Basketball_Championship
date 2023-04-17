import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { User } from '../models/User';
import { UserService } from '../services/model_services/user.service';
import { SnackbarService } from '../shared/snackbar.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  snackbar: boolean = false;

  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    rePassword: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    date: new FormControl(new Date(), [Validators.min(this.getMinimumDate()), Validators.required])
  })

  constructor(
    private datePipe: DatePipe,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.snackbarService.show(['Regisztrációs oldal. Itt tudsz regisztrálni.'], 'red-snackbar');
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      try {
        const email = this.signUpForm.get('email')?.value as string;
        const password = this.signUpForm.get('password')?.value as string;;
        const rePassword = this.signUpForm.get('rePassword')?.value;
        const birthDate = this.signUpForm.get('date')?.value;
        const name = this.signUpForm.get('name')?.value;
        const areEquals: boolean = password && rePassword ? this.arePasswordsEqual(password, rePassword) : false;
        const errors = [];

        if (!birthDate || this.getAge(birthDate) < 18) {
          errors.push('Minimum korhatár 18 életév!');
        }

        if (!areEquals) {
          errors.push('A jelszavak nem egyeznek!');
        }

        if (errors.length > 0) {
          this.snackbarService.show(errors);
          return;
        }


        this.authService.signUp(email, password)
          .then(response => {
            response.user?.updateProfile({
              displayName: this.signUpForm.get('name')?.value
            }).catch(err => {
              console.error('semmi kecs' + err);
            });

            const user: User = {
              id: response.user?.uid as string,
              email: email,
              name: name as string,
              birthDate: birthDate as Date,
              Admin: false
            }
            this.userService.create(user).catch(error => {
              console.error('geci kecs:' + error);
            })

            if (response) {
              this.snackbarService.show(['Registration successful!'], 'green-snackbar');
              this.router.navigate(['/profile']);

            }
          }).catch(err => {
            const errorMessages = [];
            if (err.code === 'auth/invalid-email') {
              errorMessages.push('Nem érvényes e-mail cím!');
            } else if (err.code === 'auth/weak-password') {
              errorMessages.push('Túl gyenge jelszó! (minimum 6 karakter)');
            } else if (err.code === 'auth/email-already-in-use' || err.code === 'auth/email-already-exists') {
              errorMessages.push('Az email már használatban van.');
            } else if (err.code === 'auth/network-request-failed') {
              errorMessages.push('Hálózati hiba történt, kérlek ellenőrizd az internetkapcsolatodat.');
            } else if (err.code === 'auth/too-many-requests') {
              errorMessages.push('Túl sok sikertelen bejelentkezési kísérlet történt, kérlek próbálkozz később.');
            } else if (err.code === 'auth/user-disabled') {
              errorMessages.push('A fiók letiltva, kérlek lépj kapcsolatba az ügyfélszolgálattal.');
            } else if (err.code === 'auth/user-not-found') {
              errorMessages.push('Nincs felhasználó ezzel az email címmel. Kérlek ellenőrizd, hogy helyes email címet adtál meg, vagy regisztrálj egy új fiókot.');
            } else if (err.code === 'auth/wrong-password') {
              errorMessages.push('Helytelen jelszó, kérlek próbálkozz újra.');
            } else {
              errorMessages.push('A regisztráció sikertelen!');
            }

            this.snackbarService.show(errorMessages, 'red-snackbar');
          });

      } catch (error: any) {
        this.snackbarService.show(["Ismeretlen hiba történt."], 'red-snackbar');
        /* if(error.code == 'auth/email-already-in-use'){
          this.snackbarService.show(['az email már használatban van.'], 'red-snackbar');
        } */
      }
    }
  }

  getAge(dateOfBirth: Date): number {
    const today = new Date();
    const diff = today.getTime() - dateOfBirth.getTime();
    const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    return age;
  }

  getMinimumDate(): number {
    const today = new Date();
    const minAgeDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    const diff = today.getTime() - minAgeDate.getTime();
    const minAge = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    return minAge;
  }


  arePasswordsEqual(password: string, passwordAgain: string): boolean {
    return password === passwordAgain;
  }

  get email() {
    return this.signUpForm.get('email');
  }

}