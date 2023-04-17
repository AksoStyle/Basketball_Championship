import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarRef, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  private _snackBar: MatSnackBar;
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';

  constructor(snackBar: MatSnackBar) {
    this._snackBar = snackBar;
  }

  public show(messages: string[], panelClass: string = 'red-snackbar'): void {
    for (let message of messages) {
      this._snackBar.open(message, '', {
        duration: 3000,
        panelClass: [panelClass],
        verticalPosition: this.verticalPosition,
        horizontalPosition: this.horizontalPosition
      });
    }
  }
}
