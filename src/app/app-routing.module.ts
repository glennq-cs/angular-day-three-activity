import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ClientsComponent } from './pages/clients/clients.component';

const routes: Routes = [
    {
      path: '', component: HomeComponent
    },
    {
      path: 'my-profile', component: ProfileComponent
    },
    {
      path: 'my-client-groups', component: ClientsComponent
    },
    {
      path: '**', component: NotFoundComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
