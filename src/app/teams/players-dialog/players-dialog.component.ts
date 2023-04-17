import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlayersService } from 'src/app/services/players.service';

@Component({
  selector: 'app-players-dialog',
  templateUrl: './players-dialog.component.html',
  styleUrls: ['./players-dialog.component.scss']
})
export class PlayersDialogComponent {
  players: Array<any> = [];

  constructor(
    public dialogRef: MatDialogRef<PlayersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.players = data.players;
  }

  

  onNoClick(): void {
    this.dialogRef.close();
  }
}
