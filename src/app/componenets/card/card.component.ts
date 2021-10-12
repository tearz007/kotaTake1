import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { ServiseService } from '../../services/servise.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  itemKota = [];
  itemSanguage = [];
  itemCd = [];
  card = [];
  ptPrice = 0;
  val
  notVal
  item_num = 0;
  isHiddent = true
  isHiddent2 = false
  constructor(private service: ServiseService, private dataS: DataService, private route: Router) {
    this.itemCd = this.dataS.itemId;
    this.item_num = this.dataS.itemId.length;
    this.hidden()
  }

  ngOnInit(): void {

    this.dataS.getImg().subscribe(item_data => {
      this.itemKota = [];
      item_data.forEach(a => {
        let data: any = a.payload.doc.data();
        data.id = a.payload.doc.id;
        this.itemKota.push(data);
      })
      console.log("item kota is:" + this.itemKota.length)
      this.readf()
    })
    this.dataS.getsanguages().subscribe(item_data => {
      this.itemSanguage = [];
      item_data.forEach(a => {
        let data: any = a.payload.doc.data();
        data.id = a.payload.doc.id;
        this.itemSanguage.push(data);
      })
      this.readf()
    })

    if (this.itemCd.length == 0) {
      this.val = true;
      this.notVal = false;
    }
  }

  hidden() {
    if (this.item_num === 0) {
      this.isHiddent = false
      this.isHiddent2 = true
    }
  }

  deleter(id) {
    for (let i = 0; i < this.dataS.itemId.length; i++) {
      if (this.card[i].id === id) {
        // alert("deleted");
        this.service.reloadComponent('card')
        this.dataS.itemId.splice(i, 1);
        this.card.splice(i, 1);
        this.ptPrice = 0;
        this.card.forEach(a => {
        this.ptPrice = this.ptPrice + a.price;

        });
      }
    }
  }

  tomenu() {
    this.route.navigate(['home']);
  }

  toHome() {
    this.route.navigate(['']);
  }

  totalPrice() {
    this.ptPrice = 0;
    this.card.forEach(a => {
      this.ptPrice = this.ptPrice + a.price;

    });
  }
  readf() {

    this.itemKota.forEach(a => {

      for (let i = 0; i < this.itemCd.length; i++) {
        if (a.id === this.itemCd[i]) {
          this.card[i] = a;
        }
      }
    });
    this.itemSanguage.forEach(a => {

      for (let i = 0; i < this.itemCd.length; i++) {
        if (a.id === this.itemCd[i]) {
          this.card[i] = a;
        }
      }
    });
    this.totalPrice()
  }

}
