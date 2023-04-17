import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Championships } from 'src/app/models/Championships';


@Injectable({
  providedIn: 'root'
})
export class ChampionshipsService {
  collectionName = 'Championships';


  constructor(private firestore: AngularFirestore) { }

  create(championships: Championships){
    return this.firestore.collection<Championships>(this.collectionName).doc(championships.id).set(championships);
  }

  getAllChampionships(){
    return this.firestore.collection<Championships>(this.collectionName).valueChanges();
  }

  deleteChampionship(id: string) {
    return this.firestore.collection<Championships>(this.collectionName).doc(id).delete();
  }

  
}
