import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  movies: any[] = [];
  favMov: any[] = [];
  user: any [] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackbar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFav();
  }

  /**
   * Getting all movies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Getting the favorites of a user
   */
  getFav(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((res: any) => {
      this.favMov = res.FavoriteMovies;
      console.log(this.favMov);
      return this.favMov;
    });
  }

  /**
   * Opens the genre dialog
   * @param name 
   * @param description 
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: {name, description},
    });
  }
  
  /**
   * Opens the director dialog
   * @param name 
   * @param bio 
   * @param birth 
   */
  openDirectorDialog(name: string, bio: string, birth: any): void {
    this.dialog.open(DirectorCardComponent, {
      data: {name, bio, birth},
    });
  }

  /**
   * Opens the synopsis (movie details) dialog
   * @param title 
   * @param description 
   */
  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisCardComponent, {
      data: {title, description},
    });
  }

  /**
   * Adds a movie to the favorite list of an user
   * @param movieID 
   * @param title 
   * @returns the updated list
   */
  addMovieToFav(movieID: any, title: string): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.addMovie(user, movieID).subscribe((res: any) =>{
      this.snackbar.open(`You successfully added ${title} to your favorite list`, 'OK', {
        duration: 2000
      });
    });
    this.ngOnInit();
    return this.getFav();
  }

  /**
   * Removes a movie from the favorite list of an user
   * @param movieID 
   * @param title 
   * @returns the updated list
   */
  removeMovieFromFav(movieID: any, title: string): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.deleteMovie(user, movieID).subscribe((res: any) =>{
      this.snackbar.open(`You successfully deleted ${title} from your favorite list`, 'OK', {
        duration: 2000
      });
    });
    this.ngOnInit();
    return this.getFav();
  }
  
  /**
   * Checks wether the movie is in the favorites list of an user
   * @param movieID 
   * @returns a boolean expression
   */
  isFav(movieID: any): boolean {
    if (this.favMov.indexOf(movieID) > -1) {
      return true;
    } else {
      return false;
    }
  }
}
