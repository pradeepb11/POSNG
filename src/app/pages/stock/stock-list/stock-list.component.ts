import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { RestService } from '../../../@core/rest/rest.service';
import { SmartTableData } from '../../../@core/data/smart-table';
import { Routes, RouterModule, Router } from '@angular/router';
import { NbToastrService, NbToastrConfig } from '@nebular/theme';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss'],
})
export class StockListComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('sessionUser'));
  areaOptions = [];
  storeId: any;
  branchId: any;
  data = [];
  branchList = [];
  stockList = [];
  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
      },
    // add: {
    //   confirmCreate: true,
    //   addButtonContent: '<i class="nb-plus"></i>',
    //   createButtonContent: '<i class="nb-checkmark"></i>',
    //   cancelButtonContent: '<i class="nb-close"></i>',
    // },
    // edit: {
    //   confirmSave: true,
    //   editButtonContent: '<i class="nb-edit"></i>',
    //   saveButtonContent: '<i class="nb-checkmark"></i>',
    //   cancelButtonContent: '<i class="nb-close"></i>',
    // },
    // delete: {
    //   deleteButtonContent: '<i class="nb-trash"></i>',
    //   confirmDelete: true,
    // },
    columns: {
      stock_id: {
        title: 'ID',
        type: 'number',
        hide: true,
      },
      product_name: {
        title: 'Product Name',
        type: 'string',
      },
      sku: {
        title: 'SKU',
        type: 'string',
      },
      stock_quantity: {
        title: 'Quantity',
        type: 'string',
      },
      stock_unit: {
        title: 'Unit',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData, private api: RestService,
    public router: Router, private toastrService: NbToastrService) { }

  ngOnInit() {

    this.api.getStoreBranchList(this.currentUser.store_id).subscribe(result => {
      if (result['response']['status'] === 'success') {
        this.branchList = result['data'];
      } else {

      }
    });

  }

  getBranchStock(branch) {
    this.api.getBranchStock(branch).subscribe(result => {
      if (result['response']['status'] === 'success') {
        this.stockList = result['data'];
        this.source.load(this.stockList);
      } else {
        this.stockList = [];
      }
    });
  }
}
