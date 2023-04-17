import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services//model_services/user.service';
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SnackbarService } from '../shared/snackbar.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  options: string[] = [];
  loggedInUser?: firebase.default.User | null;
  admin: boolean = false;

  constructor(private authService: AuthService,private userService: UserService,private snackbarService: SnackbarService, private router: Router) {}

  ngOnInit() {
    this.authService.isUserLoggedIn().subscribe(user => {
      this.loggedInUser = user;
      localStorage.setItem('user', JSON.stringify(this.loggedInUser));
      this.isAdmin().subscribe(result => {
        if (result) {this.admin = true;}
      });
    }, error => {
      this.snackbarService.show(['Ismeretlen hiba lépett fel.'], 'red-snackbar');
      localStorage.setItem('user', JSON.stringify(null));
    });
  }

  logout() {
    this.authService.logout().then(() => {
      this.snackbarService.show(['Siekres kijelentkezés!'], 'red-snackbar');
      this.router.navigate(['home']);
      
    }).catch(error => {
      console.error(error);
    });
  }

  isAdmin(): Observable<boolean> {
    return this.userService.getAll().pipe(
      map((user: User[]) => {
        for (let us of user) {
          if (this.loggedInUser?.displayName === us.name && us.Admin) {return true;}
        }
        return false;
      })
    );
  }

}