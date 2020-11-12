import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  itemCount=0;
  itemId=[];

  constructor(private afs: AngularFirestore) { }


  setid(id){
   this.itemId.push(id);
   this.itemCount=this.itemCount+1;
   //this.addcardDB(id);
  }

  getIds(){
    return this.itemId;
  }

  getImg(){
    return this.afs.collection('images').snapshotChanges();
  }
  getBackground(){
    return this.afs.collection('backImages').snapshotChanges();
  }

  getsanguages(){
    return this.afs.collection('sanguages').snapshotChanges();
  }

}
