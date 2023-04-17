import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TeamsComponent } from './teams/teams.component';
import { PlayersComponent } from './players/players.component';
import { NewsComponent } from './news/news.component';
import { StandingsComponent } from './standings/standings.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './services/auth.guard';



const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'teams', component: TeamsComponent, canActivate: [AuthGuard] },
  { path: 'players', component: PlayersComponent , canActivate: [AuthGuard]},
  { path: 'news', component: NewsComponent },
  { path: 'standings', component: StandingsComponent , canActivate: [AuthGuard]},
  { path: 'schedule', component: ScheduleComponent , canActivate: [AuthGuard]},
  { path: 'admin', component: AdminComponent , canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'profile', component: ProfileComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: '**', redirectTo: '/home' } 
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
