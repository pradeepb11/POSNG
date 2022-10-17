import { AuthGuardService } from './../auth-guard.service';
import { Injectable } from '@angular/core';
import { MENU_ITEMS_ADMIN, MENU_ITEMS_SUPERADMIN } from './pages-menu';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  menu: any = [];
  constructor(private auth: AuthGuardService) { }

  get_menu() {
    const currentUser = JSON.parse(localStorage.getItem('sessionUser'));
    if (currentUser.role === 'admin') {
      this.menu = MENU_ITEMS_ADMIN;
    } else if (currentUser.role === 'superadmin') {
      this.menu = MENU_ITEMS_SUPERADMIN;
    }
    return this.menu;
  }
}
