import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { ServiseService } from '../../services/servise.service';





@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent implements OnInit {

  item_num;
  items = [];
  login
  users
  num = 0;
  isdisabled=true
  
  
  constructor(private route: Router, private service: ServiseService, public dataS: DataService) {
    this.item_num = this.dataS.itemId.length;
    this.view()
    
    if (!this.users) {
      this.login = "Login"
    }
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

  onLoad(){
    this.isdisabled=false
    alert(this.isdisabled)
  }
  



  view() {
    this.service.checkUser().subscribe(user => {
      this.users = user.email;
      this.login = "LogOut"
    })
  }

  loginFunction() {

    if (this.users) {
      console.log("your online");
      this.logout()

    }
    else {
      console.log("your offline")
      this.toLogin()
      this.login = "LogOut";

    }
  }


  logout() {
    console.log("clicked logout")
    this.service.logout().then(() => {

    this.service.reloadComponent('')
    }).catch(err => {
      alert(err.message);
    })
  }

  toLogin() {
    this.route.navigate(['login']);
  }

  tomenu() {
    this.route.navigate(['menu']);
  }
  toCard() {
    this.route.navigate(['card']);
    //alert(this.dataS.getIds());
  }

}
