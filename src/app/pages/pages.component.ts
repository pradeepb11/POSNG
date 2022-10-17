import { Component } from '@angular/core';
import { MenuService } from './menu-service';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  constructor(private menuData: MenuService) { }

  menu = this.menuData.get_menu();
}
