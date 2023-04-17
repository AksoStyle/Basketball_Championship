import { Component } from '@angular/core';
import { ChampionshipsService } from '../services/model_services/championships.service';
import { MatDialog } from '@angular/material/dialog';
import { ScheduleDialogComponent } from './schedule-dialog/schedule-dialog/schedule-dialog.component';
import { User_Championships } from '../models/User_Championships';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../shared/snackbar.service';
import { TimestampToDatePipe } from '../shared/timestamp-to-date.pipe';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  providers:[TimestampToDatePipe]
})
export class ScheduleComponent {
  championships: Array<any> = [];
  loggedInUser?: firebase.default.User | null;
  userChampionships: User_Championships;

  constructor(
    private championshipsService: ChampionshipsService,
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private snackbarService: SnackbarService,
  ) {
    this.userChampionships = {
      championship_id: '',
      user_id: '',
      name: '',
      date: new Date()
    };
  }

  ngOnInit(): void {
    this.championshipsService.getAllChampionships().subscribe((champ) => {
      this.championships = champ;
    });
  }

  async openConfirmationDialog(champ: any): Promise<void> {
    const dialogRef = this.dialog.open(ScheduleDialogComponent, {
      data: {
        championship: champ,
        userChampionships: {},
      },
    });

    this.authService.isUserLoggedIn().subscribe((user) => {
      if (user) {
        this.loggedInUser = user;
        this.userChampionships = {
          championship_id: champ.id,
          user_id: this.loggedInUser.uid,
          name: champ.name,
          date: champ.date,
        };
        dialogRef.componentInstance.data.userChampionships = this.userChampionships;
      }
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        this.authService.isUserLoggedIn().subscribe((user) => {
          if (user) {
            this.loggedInUser = user;
            this.snackbarService.show(['Sikeres jelentkezés a bajnokságra!'], 'success-snackbar');
            setInterval(() => {
              this.router.navigate(['/profile']);
            }, 2000);

          }
        });
      }
    });
  }

}
