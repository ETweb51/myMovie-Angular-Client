import { Injectable } from '@angular/core';

import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://mymoviedbcf.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {

  constructor(private http: HttpClient) { 
  }

  /**
   * Registers the user
   * @param userDetails 
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Logs in user
   * @param userDetails 
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Gets all the movies
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Gets a movie by title
   * @param title 
   */
  getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies/${title}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Gets the current user
   * @param username 
   */
  getUser(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `users/${username}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Adds a movie to the favorites list of the user
   * @param username 
   * @param movieId 
   */
  addMovie(username: any, movieId: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + `users/${username}/movies/${movieId}`, null, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Deletes a movie from the favorites list of the user
   * @param username 
   * @param movieId 
   */
  deleteMovie(username: any, movieId: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + `users/${username}/movies/${movieId}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Edits user details
   * @param userData 
   */
  editUser(userData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.put(apiUrl + `users/${username}`, userData, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Deletes a user
   * @param username 
   */
  deleteUser(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + `users/${username}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Non-typed response extraction
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || { };
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error ocurred:', error.error.message);
    } else {
      console.error(`Error Status code ${error.status}, ` + `Error body is: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}
