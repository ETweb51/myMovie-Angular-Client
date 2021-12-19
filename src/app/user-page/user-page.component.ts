import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { EditCardComponent } from '../edit-card/edit-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DeleteCardComponent } from '../delete-card/delete-card.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  favMov: any = [];
  user: any = {};
  movies: any[] = [];
  favorites: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getFav();
    this.getMovies();
  }

  /**
   * Gets the favorite list of the user
   */
  getFav(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((res: any) => {
      this.favorites = res.FavoriteMovies;
      console.log(this.favorites);
      return this.filterMovies();
    });
  }

  /**
   * Gets all the movies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Filters all the movies out which are not in the favorite lists
   * and stores the movies, which are in the favorites list in favMov
   * favMov is going to be displayed to the user
   * @returns the movies in the favorites list with all their details
   */
  filterMovies(): void {
    this.movies.forEach((movie: any) => {
      if (this.favorites.includes(movie._id)) {
        this.favMov.push(movie);
      }
    });
    console.log(this.favMov);
    return this.favMov;
  }
  
  /**
   * Get the user
   */
  getUser(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((res: any) => {
      this.user = res;
      console.log(this.user);
      return this.user
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
   * Opents the synopsis (movie details) dialog
   * @param title 
   * @param description 
   */
  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisCardComponent, {
      data: {title, description},
    });
  }

  /**
   * Opens the user edit dialog
   */
  openUserEditDialog(): void {
    this.dialog.open(EditCardComponent, {
      width: '280px'
    });
  }

  /**
   * Opens the deletion dialog
   */
  openUserDeleteDialog(): void {
    this.dialog.open(DeleteCardComponent, {
      width: '280px'
    });
  }

  /**
   * Removes a movie from the favorite list of an user
   * @param movieID 
   * @param title 
   */
  removeMovieFromFav(movieID: any, title: string): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.deleteMovie(user, movieID).subscribe((res: any) =>{
      this.snackBar.open(`You successfully deleted ${title} from your favorite list`, 'OK', {
        duration: 2000
      });
    });
  }
}
