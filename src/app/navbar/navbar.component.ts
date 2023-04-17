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
  isAdmin$: Observable<boolean>;
  

  constructor(private authService: AuthService,private userService: UserService,private snackbarService: SnackbarService, private router: Router) {
    this.isAdmin$ = this.userService.getAllAdmin().pipe(
      map(users => {
        const currentUserId = this.loggedInUser?.uid;
        const currentUserIsAdmin = users.some(user => user.id === currentUserId && user.Admin);
        return currentUserIsAdmin;
      })
    );
  }

  ngOnInit() {
    if(this.isAdmin()) {this.admin = true;}
    
    this.authService.isUserLoggedIn().subscribe(user => {
      this.loggedInUser = user;
      localStorage.setItem('user', JSON.stringify(this.loggedInUser));
      
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
    return this.userService.getAllAdmin().pipe(
      map(users => {
        const currentUserId = this.loggedInUser?.uid;
        const currentUserIsAdmin = users.some(user => user.id === currentUserId && user.Admin);
        return currentUserIsAdmin;
      })
    );
  }
  

}