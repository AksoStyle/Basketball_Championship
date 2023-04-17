import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'basketball_championship_2023';

  loading: boolean; // változó a betöltés állapotának tárolására

  constructor(private router: Router) {
    this.loading = false; // alapértelmezett érték: nincs betöltés
    this.router.events.subscribe(event => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true; // betöltés elindult
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false; // betöltés befejeződött
          break;
        }
        default: {
          break;
        }
      }
    });
  }
}