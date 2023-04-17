import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';


// Komponensek
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { TeamsComponent } from './teams/teams.component';
import { PlayersComponent } from './players/players.component';
import { StandingsComponent } from './standings/standings.component';
import { NewsComponent } from './news/news.component';
import { FooterComponent } from './footer/footer.component';


//MaterialUI directive import
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';


//Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth'; // Firebase Authentication Module
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'; // Cloud Firestore Module
import { environment } from '../environments/environment';
import { PlayersDialogComponent } from './teams/players-dialog/players-dialog.component';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { ProfileComponent } from './profile/profile.component';
import { ScheduleDialogComponent } from './schedule/schedule-dialog/schedule-dialog/schedule-dialog.component';
import { TimestampToDatePipe } from './shared/timestamp-to-date.pipe';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ScheduleComponent,
    TeamsComponent,
    PlayersComponent,
    StandingsComponent,
    NewsComponent,
    FooterComponent,
    AdminComponent,
    LoginComponent,
    RegistrationComponent,
    PlayersDialogComponent,
    ProfileComponent,
    ScheduleDialogComponent,
    TimestampToDatePipe,
    



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatCardModule,
    MatDialogModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),


  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
