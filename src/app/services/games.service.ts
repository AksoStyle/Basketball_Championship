import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private firestore: FirestoreService) { }

  getAllGames() : Observable<any[]>{
    return this.firestore.getAllDocuments('games');
  }
}
