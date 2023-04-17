import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserChampionshipsService } from 'src/app/services/model_services/user-championships.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule-dialog',
  templateUrl: './schedule-dialog.component.html',
  styleUrls: ['./schedule-dialog.component.scss']
})
export class ScheduleDialogComponent {

  constructor(private userChampionshipsService: UserChampionshipsService,
    public dialogRef: MatDialogRef<ScheduleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private router: Router
  ) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    
    this.userChampionshipsService.create(this.data.userChampionships).then(() => {
      this.dialogRef.close(true);
      //this.router.navigate(['/profile']);
    });
  }
}
