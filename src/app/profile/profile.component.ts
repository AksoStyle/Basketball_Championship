import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { take } from 'rxjs';
import { UserService } from '../services/model_services/user.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { User } from '../models/User';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { UserChampionshipsService } from '../services/model_services/user-championships.service';
import { SnackbarService } from '../shared/snackbar.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  email: string | null = null;
  name: string | null = null;
  date: Date = new Date();
  loggedInUser?: firebase.default.User | null;
  currentDate: Date = new Date();

  userChampionships: any[] = [];

  modalVisible = false;

  ProfileForm = new FormGroup({
    email: new FormControl(''),
    name: new FormControl(''),
    date: new FormControl(new Date(), [Validators.min(this.getMinimumDate())])
  })

  constructor(private authService: AuthService,
    private userService: UserService,
    private userChampionshipService: UserChampionshipsService,
    private auth: AngularFireAuth,
    private router: Router,
    private snackbarService: SnackbarService
    ) { }

  async ngOnInit() {
    this.authService.isUserLoggedIn().subscribe(async user => {
      if (user) {
        this.loggedInUser = user;
        this.userChampionshipService.getChampionshipsByUserId(user.uid).subscribe((championships: any) => {
          this.userChampionships = championships;
          
        });
        const userColl = await this.userService.getById(user.uid).pipe(take(1)).toPromise();
        if (userColl) {
          this.email = userColl?.email;
          this.name = userColl?.name;
        }
      }
    }, error => {
      this.snackbarService.show(['Ismeretlen hiba lépett fel.'], 'red-snackbar')
    });
  }

  onSubmit() {
    if (this.ProfileForm.valid) {
      const user: User = {
        id: this.loggedInUser!.uid,
        email: this.ProfileForm.value.email as string,
        name: this.ProfileForm.value.name as string,
        birthDate: this.ProfileForm.value.date as Date,
        Admin: false,
      };

      this.userService.update(user)
        .then(() => {
          this.snackbarService.show(['Adatok változtatása sikeres!'], 'green-snackbar');
        })
        .catch(error => {
          console.error(error);
        });

      this.updateEmail(user.email)
        .then(() => {
          this.snackbarService.show(['Email változtatása sikeres!'], 'green-snackbar');
          return this.auth.signOut(); 
        })
        .then(() => {
          this.snackbarService.show(['Sikeres kijelentkezés.'], 'green-snackbar');
          this.authService.logout();
          this.router.navigate(['/login']); 
        })
        .catch(error => {
          console.warn(error); 
        });
    }
  }





  getMinimumDate(): number {
    const today = new Date();
    const minAgeDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    const diff = today.getTime() - minAgeDate.getTime();
    const minAge = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    return minAge;
  }

 async updateEmail(newEmail: string) {
    const currentUser = await this.auth.currentUser;
    if (currentUser) {
      return currentUser.updateEmail(newEmail);
    }
    throw new Error('User is not logged in');
  }


  confirmDelete() {
    this.modalVisible = true;
  }

  async deleteAccount() {
    try {
      const user = await this.auth.currentUser;
      if (user) {
        await this.userService.delete(user.uid);
        await user.updateProfile({ displayName: 'deleted' });
        await user.updateEmail(`${user.uid}@deleted.com`);
        await user.updatePassword(`${user.uid}deleted`);
        await user.unlink('phone');
        await user.delete();
        await user.getIdToken(true);
        await this.auth.signOut();
        await this.auth.signInWithEmailAndPassword(`${user.uid}@deleted.com`, `${user.uid}deleted`);
        await this.auth.currentUser.then((user) => {
          return user?.delete();
        });
        await this.router.navigate(['/home']);
      }
    } catch (error) {
      console.error(error);
    }
  }

  unsubscribe(championshipId: string) {
    this.authService.isUserLoggedIn().subscribe(async user => {
      if (user) {
        this.userChampionshipService.unsubscribe(championshipId)
          .then(() => {
            // Unsubscribe successful
            this.snackbarService.show(['Sikeres lejelentkezés!.'], 'green-snackbar');
          })
          .catch(error => {
            this.snackbarService.show(['Váratlan hiba lépett fel!'], 'red-snackbar');
          });
      }
    });
  }
}