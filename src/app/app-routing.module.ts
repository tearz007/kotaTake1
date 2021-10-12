import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartPageComponent } from './componenets/start-page/start-page.component';
import { LoginComponent } from './componenets/login/login.component';
import { MenuComponent } from './componenets/menu/menu.component';
import { CardComponent } from './componenets/card/card.component';

  //'./componenets/facebook-login/facebook-login.component'

const routes: Routes = [
  { path: 'card', component: CardComponent },
  { path: '', component: StartPageComponent },
  { path: 'home', component: StartPageComponent },
  { path: 'menu', component: MenuComponent},
  { path: 'login', component: LoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
