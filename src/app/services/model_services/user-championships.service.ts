import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { User_Championships } from 'src/app/models/User_Championships';

@Injectable({
  providedIn: 'root'
})
export class UserChampionshipsService {
  collectionName = 'User_Championships';

  constructor(private firestore: AngularFirestore) { }

  create(uc: User_Championships) {
    return this.firestore.collection<User_Championships>(this.collectionName).doc(uc.championship_id).set(uc);
  }


  getChampionshipsByUserId(userId: string): Observable<any> {
    return this.firestore.collection(this.collectionName, ref => ref.where('user_id', '==', userId)).valueChanges();
  }

  unsubscribe(championshipId: string): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(championshipId).delete();
  }
  

}
