import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { ServiseService } from '../../services/servise.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  items=[];
  sanguges=[];
  item_num;
  state
  constructor(private dp:AngularFirestore , private route:Router ,private service :ServiseService,private dataS:DataService) {
    this.item_num=this.dataS.itemId.length;
    this.viewUser()
   }

  ngOnInit(): void {

    //this.item_num=this.dataS.itemId.length;
   this.dataS.getImg().subscribe(item_data =>{
      this.items=[];
     item_data.forEach(a=>{
       let data:any= a.payload.doc.data();
       data.id= a.payload.doc.id;
       this.items.push(data);
     })
   })

   this.dataS.getsanguages().subscribe(item_data =>{
      this.sanguges;
     item_data.forEach(a=>{
       let data:any= a.payload.doc.data();
       data.id= a.payload.doc.id;
       this.sanguges.push(data);
     })
   })

  }

  viewUser(){
    this.service.checkUser().subscribe(users=>{
     //console.log(users.email)
     this.state=users.email
   })
  }
  addCount(id){
     if (this.state) {
        console.log(this.state);
        this.dataS.setid(id);
        this.item_num=this.dataS.itemId.length;
        alert("Added to card")
     }else{
       this.route.navigate(['login'])
     }
  }



 toCard(){
   this.route.navigate(['card']);

 }
  toHome(){
   this.route.navigate(['']);
  }

}
