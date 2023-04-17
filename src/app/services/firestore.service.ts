import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection  } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import type { DocumentData } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) {  }

   
  public getAllDocuments(collection: string): Observable<DocumentData[]> {
    const collectionRef: AngularFirestoreCollection<DocumentData> = this.firestore.collection(collection);
    return collectionRef.valueChanges();
  }

  
  public getDocumentById(collection: string, id: string): Observable<any> {
    return this.firestore.collection(collection).doc(id).valueChanges();
  }

  public getDocumentsByCondition(collectionName: string, field: string, operator: firebase.default.firestore.WhereFilterOp, value: any): Observable<any[]> {
    return this.firestore.collection(collectionName, ref => ref.where(field, operator, value)).valueChanges();
  }

  getPlayersByTeamName(teamName: string): Observable<any[]> {
    return this.firestore.collection('players', ref => ref.where('Team', '==', teamName)).valueChanges();
  }


}
