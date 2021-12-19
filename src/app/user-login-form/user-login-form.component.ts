import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userCredentials= { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  /**
   * User logs in with username and password
   * token and username are stored in the local storage
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userCredentials).subscribe((result) => {
      this.dialogRef.close();

      localStorage.setItem('token', result.token);
      localStorage.setItem('user', this.userCredentials.Username);
      console.log(result);
      this.snackBar.open('You are successfully logged in', 'OK', {
        duration: 2000
      });
      this.router.navigate(['movies'])
    }, (result) => {
      console.log(result)
      this.snackBar.open('Something went wrong mate', 'OK', {
        duration: 2000
      });
    });
  }
}
