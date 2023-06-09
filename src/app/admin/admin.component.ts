import { Component, Input, SimpleChanges, ViewChild, ChangeDetectorRef   } from '@angular/core';
import { UserService } from '../services/model_services/user.service';
import { ChampionshipsService } from '../services/model_services/championships.service';
import { User } from '../models/User';
import { Championships } from '../models/Championships';
import { MatTableDataSource } from '@angular/material/table';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgForm } from '@angular/forms';
import { SnackbarService } from '../shared/snackbar.service';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  //Users
  displayedColumns: string[] = ['id', 'email', 'name', 'birthDate', 'Admin'];
  dataSource = new MatTableDataSource<User>([]);
  
  //Championships
  displayedColumns_championships: string[] = ['id', 'name', 'date', 'delete'];
  dataSource_championships = new MatTableDataSource<Championships>([]);

  users: User[] = [];
  championships : Championships[] = [];

  selectedDate: Date = new Date();
  today = new Date();
  minDate : Date = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 3)

  

  constructor(
    private userService: UserService,
    private championshipsService: ChampionshipsService,
    private firestore: AngularFirestore,
    private snackbarService: SnackbarService,
    private changeDetector: ChangeDetectorRef
    ) { }

   

  ngOnInit(): void {
    this.snackbarService.show(['Üdvözlünk Admin!'], 'green-snackbar')
    this.userService.getAll().subscribe((users: User[]) => {
      this.users = users;
      
    });

    this.championshipsService.getAllChampionships().subscribe((champs: Championships[]) => {
      this.championships = champs;
      
    })
    
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges lefutott');
    if (changes['dataSource']) {
      this.changeDetector.detectChanges();
      console.log(this.dataSource)
    }
  } 

  async deleteChampionship(id: string) {
      try {
        await this.championshipsService.deleteChampionship(id);
        this.snackbarService.show(['Sikeres Törlés.'], 'green-snackbar')
      } catch (error) {
        this.snackbarService.show(['Ismeretlen hiba lépett fel.'], 'red-snackbar')
      }
  }

  createChampionship(championshipData: any, form: NgForm) {
    const championship: Championships = {
      id: this.firestore.createId(),
      name: championshipData.name,
      date: championshipData.date
    };
  
    this.championshipsService.create(championship)
      .then(() => {
        this.snackbarService.show(['Sikeres Hozzáadás.'], 'green-snackbar')
        this.resetChampionshipForm(form);
      })
      .catch((error) => {
        console.error('Hiba történt a bajnokság hozzáadása közben:', error);
      });
  }
  
  resetChampionshipForm(form: NgForm) {
    form.resetForm();
  }

  filterBy(value: string){
    if(value === 'all'){
      this.userService.getAll().subscribe(users => {
        this.users = users;
      })
       
      console.log('All: ', this.users);
    } else if (value === 'Admin') {
      this.userService.getAllAdmin().subscribe((users: User[]) => {
        console.log('Getadmins:, ', users)
        this.users = users;
        console.log('Admin: ', this.dataSource.data);
      })
      

    }
  }
  

  
  
 
}