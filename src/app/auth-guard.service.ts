import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor() { }
  gettoken() {
    return !!localStorage.getItem('sessionUser');
  }

  public currentUserValue() {
    return JSON.parse(localStorage.getItem('sessionUser'));
  }
}
