import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private firestoreService: FirestoreService) { }

  getAllNews(): Observable<any[]>{
    return this.firestoreService.getAllDocuments('news');
  }
}
