import { Component } from '@angular/core';
import { GamesService } from '../services/games.service';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss']
})
export class StandingsComponent {
  games: Array<any> = [];

  constructor(private gamesService: GamesService){}

  ngOnInit() : void{
    this.gamesService.getAllGames().subscribe((games)  => {
      this.games = games;
    })
  }
}