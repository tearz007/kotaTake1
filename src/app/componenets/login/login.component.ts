import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';


import { Observable, of } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators'
import { user } from '../../convet/user';
import { ServiseService } from '../../services/servise.service';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { auth } from 'firebase';
import { FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userEmail: string;
  userPass: string;
  Name: string;
  surname: string;
  phone_number: number;
  email: string;
  password: string;

  isSignup = false;
  isLogin = true;
  user: any = {};
  userL: Observable<user>
  items = [];

  formControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  fControl = new FormControl('', [
    Validators.required
  ]);




  constructor(private service: ServiseService, 
  private dataS: DataService, 
  private auth: AngularFireAuth, 
  private afs: AngularFirestore,
    private router: Router) {

    this.userL = this.auth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<user>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      }));
  }

  ngOnInit(): void {

    this.dataS.getBackground().subscribe(item_data => {
      this.items = [];
      item_data.forEach(a => {
        let data: any = a.payload.doc.data();
        data.id = a.payload.doc.id;
        this.items.push(data);
      })
    })
  }


  toggle() {
    this.isLogin = !this.isLogin;
    this.isSignup = !this.isSignup;
  }


  onCreate() {
    this.service.createAcc(this.userEmail, this.userPass).then(() => {
      alert("created");
    }).catch(err => {
      alert(err.message);
    })
  }

  signIn() {
    this.service.signIn_User(this.userEmail, this.userPass).then(() => {
      //alert("welcome, user");
      this.tomenu();
    }).catch(err => {
      alert(err.message);
    })
  }

  facebook() {
    this.service.facebookLogin().then(data => {
      this.user = data.user;
      // alert("id: " + this.user.uid + "email: " + this.user.email);
      this.tomenu();
    }).catch(err => {
      alert(err.message);
    });
  }

  tomenu() {
    this.router.navigate(['home']);
  }


  exit() {
    this.router.navigate(['']);
  }


  gmail() {
    this.service.signIn_Gmail().then(() => {
      //alert("welcome");
      this.tomenu();
    }).catch(err => {
      alert(err.message);
    })
  }


}
