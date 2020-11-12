import { Component } from '@angular/core';
import { Router,NavigationStart,NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // title = 'kotaTake1';
  showDelay=true
  constructor(private route:Router){
    this.route.events.subscribe( routerEvent=>{

      if (routerEvent instanceof NavigationStart) {
       this.showDelay=true
       console.log( this.showDelay)
      }

      if (routerEvent instanceof NavigationEnd) {
       this.showDelay=false
       console.log( this.showDelay)
      }
    })
  }
}
