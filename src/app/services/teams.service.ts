import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(private firestoreService: FirestoreService) { }

  getAllTeams(): Observable<any[]>{
    return this.firestoreService.getAllDocuments('teams');
  }
}