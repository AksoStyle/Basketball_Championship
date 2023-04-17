import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { SnackbarService } from '../shared/snackbar.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  loggedInUser?: firebase.default.User | null;

  constructor(private authService: AuthService, private snackbarService: SnackbarService) {}

  ngOnInit() {
    this.snackbarService.show(['Üdvözöllek a Kosárlabda Bajnokság oldalán!'], 'red-snackbar');
    this.authService.isUserLoggedIn().subscribe(user => {
      this.loggedInUser = user;
      localStorage.setItem('user', JSON.stringify(this.loggedInUser));
    }, error => {
      this.snackbarService.show(['Ismeretlen hiba lépett fel'], 'red-snackbar');
      localStorage.setItem('user', JSON.stringify(null));
    });
  }
}