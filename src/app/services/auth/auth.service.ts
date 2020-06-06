import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs/index';
import {user} from './user.model';
import {catchError, tap} from 'rxjs/internal/operators';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthService {

  authToken = '';
  constructor(private http: HttpClient) {
  }

  // Firebase authentication
  // tap is an operator which allows us to perform some action without changing response
  // we emit a new user and next a new user when a user logs in.
  // store authenticated user as a subject, so when a user logs in or logs out a event will be emitted.
  user = new Subject<user>();

  // make a request
  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>
    ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB4Z32Wwkv_aQ1NZtp0MdC-Bb3ailhiBo8',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError), tap((resData) => {
      this.handleAuthentication(
        resData.email,
        resData.localId,
        resData.idToken,
        +resData.expiresIn);
    }));
  }

  onLogin(email: string, password: string) {
    return this.http.post<AuthResponseData>
    ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB4Z32Wwkv_aQ1NZtp0MdC-Bb3ailhiBo8',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError), tap((resData) => {
      this.handleAuthentication(
        resData.email,
        resData.localId,
        resData.idToken,
        +resData.expiresIn);
    }));
  }


  private handleAuthentication(email: string, localId: string, token: string, expiresIn: number) {
    // create a ew user
    // date is not a part of response so generating expiresIn is in ms so * it to convert in ms.

    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const userData = new user(email, localId, token, expirationDate);
    this.user.next(userData);
    this.authToken = token;
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Email address already exists!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email address does not exists!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'The password is invalid!';
        break;
    }
    return throwError(errorMessage);
  }
}
