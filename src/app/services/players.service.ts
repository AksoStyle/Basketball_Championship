import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PlayersService {
   constructor(private firestoreService: FirestoreService) { }

  // lekéri az összes játékost az adatbázisból
  getAllPlayers(): Observable<any[]> {
    return this.firestoreService.getAllDocuments('players');
  }

  getLakersPlayers(): Observable<any[]> {
    return this.firestoreService.getDocumentsByCondition('players', 'currentTeam', '==', 'Los Angeles Lakers');
  }

  getClippersPlayers(): Observable<any[]> {
    return this.firestoreService.getDocumentsByCondition('players', 'currentTeam', '==', 'Los Angeles Clippers');
  }

  


}
