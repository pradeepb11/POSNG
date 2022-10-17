import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { RestService } from '../../../@core/rest/rest.service';
import { SmartTableData } from '../../../@core/data/smart-table';
import { Routes, RouterModule, Router } from '@angular/router';
import { NbToastrService, NbToastrConfig } from '@nebular/theme';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.scss'],
})
export class StoreListComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('sessionUser'));
  areaOptions = [];
  data = [];
  branchList = [];
  allAreas = [];
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
      store_id: {
        title: 'ID',
        type: 'number',
        hide: true,
      },
      store_name: {
        title: 'Store Name',
        type: 'string',
      },
      Edit:
      {
        title: 'Edit',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return `<a title="Edit Store" href="pages/store/store-edit/${row.store_id}"> <i class="far fa-edit"></i></a>`;
        },
        filter: false,
      },
      Delete:
      {
        title: 'Delete',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return `<a title="Delete Store" href="pages/product/product-detail/${row.store_id}"> <i class="far fa-trash-alt"></i></a>`;
        },
        filter: false,
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData, private api: RestService,
    public router: Router, private toastrService: NbToastrService) { }

  ngOnInit() {
    this.api.getStoreList().subscribe(result => {
      if (result['response']['status'] === 'success') {
        this.data = result['data'];
        this.source.load(this.data);
      } else {

      }
    });
  }

  onCreateConfirm(event) {
    const currentUrl = this.router.url;
    const data = {
      'branch_name': event.newData.branch_name,
      'area_id': event.newData.area_name,
      'address': event.newData.address,
      'created_by': this.currentUser.id,
    };
    this.api.addBranch(data).subscribe(result => {
      if (result['response']['status'] === 'success') {
        location.reload();
      } else {
        this.toastrService.danger('Fail', 'Faliure!');
      }
    });
  }

  onEditConfirm(event) {
    const currentUrl = this.router.url;
    const data = {
      'branch_id': event.newData.branch_id,
      'branch_name': event.newData.branch_name,
      'area_id': event.newData.area_id,
      'address': event.newData.address,
      'updated_by': this.currentUser.id,
    };
    this.api.updateBranch(data).subscribe(result => {
      if (result['response']['status'] === 'success') {
        location.reload();
      } else {

      }
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.api.deleteBranch(event.data.branch_id).subscribe(result => {
        if (result['response']['status'] === 'success') {
          location.reload();
        } else {

        }
      });
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
