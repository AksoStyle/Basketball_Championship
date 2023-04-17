import { Component } from '@angular/core';
import { PlayersService } from '../services/players.service';
@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent {
  players: Array<any> = [];

  constructor(private playersService: PlayersService) { }

  ngOnInit(): void {
    this.playersService.getAllPlayers().subscribe((players) => {
      this.players = players;
    });
  }
}
