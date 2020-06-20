import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';
import { CallbackComponent } from './callback/callback.component';


const routes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'home', component: HomeComponent },
  { path: 'callback', component: CallbackComponent},
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
