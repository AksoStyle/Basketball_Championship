import { Component } from '@angular/core';
import { TeamsService } from '../services/teams.service';
import { PlayersService } from '../services/players.service';
import { MatDialog } from '@angular/material/dialog';
import { PlayersDialogComponent } from './players-dialog/players-dialog.component';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent {
  teams: Array<any> = [];
  LakersPlayers : Array<any> = [];
  ClippersPlayers : Array<any> = [];

  constructor(private teamsService: TeamsService, private playersService: PlayersService,  private dialog: MatDialog) { }

  ngOnInit(): void{
    this.teamsService.getAllTeams().subscribe((teams) => {
      this.teams = teams;
    })

    this.playersService.getClippersPlayers().subscribe((clippersPlayers) => {
      this.ClippersPlayers = clippersPlayers;
    })

    this.playersService.getLakersPlayers().subscribe((lakersPlayers) => {
      this.LakersPlayers = lakersPlayers;
    })

    
  }

  openModal(team: any) {
    let players: Array<any> = [];
  if (team.id === 'lakers') {
    players = this.LakersPlayers;
  } else if (team.id === 'clippers') {
    players = this.ClippersPlayers;
  } else {
    return;
  }

    const dialogRef = this.dialog.open(PlayersDialogComponent, {
      width: '80%',
      height: '80%',
      data: { currentTeam: team.Name, players : players }
    });
  }
}