import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

  /**
   * Routes to the movies site
   */
  toMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * Routes to the profile site of the user
   */
  toUser(): void {
    this.router.navigate(['profile']);
  }

  /**
   * Routes to the welcome page when user logs out
   */
  logout(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }

}
