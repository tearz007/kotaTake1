import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { Observable, of } from 'rxjs';
import { user } from '../convet/user';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class ServiseService {

  user$: Observable<user>
  constructor( private auth: AngularFireAuth, private afs: AngularFirestore,private route: Router) {

    this.user$ = this.auth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<user>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      }));
   }

  createAcc(email, pass) {
    return this.auth.createUserWithEmailAndPassword(email, pass);
  }

  checkUser(){
    return this.auth.user
  }

  reloadComponent(routes) {
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.onSameUrlNavigation = 'reload';
    this.route.navigate([routes]);
  }

  /*-----------email an password login----------------*/
  signIn_User(email, pass){
   return this.auth.signInWithEmailAndPassword(email, pass);
  }
 /*-----------email an password End----------------*/

  /*-----------Facebook login----------------*/
  facebookLogin() {
    var provider = new auth.FacebookAuthProvider();
    return this.auth.signInWithPopup(provider);
  }
  /*-----------Facebook End----------------*/


 /*-----------gmail login----------------*/
  signIn_Gmail(){
    const provider= new auth.GoogleAuthProvider;
    return this.auth.signInWithPopup(provider)
  }
 /*-----------Gmail end----------------*/

  logout(){
    return this.auth.signOut();
  }

}
