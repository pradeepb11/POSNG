import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { RestService } from '../../../@core/rest/rest.service';
import { SmartTableData } from '../../../@core/data/smart-table';
import { Routes, RouterModule, Router } from '@angular/router';
import { NbToastrService, NbToastrConfig } from '@nebular/theme';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.scss'],
})
export class BranchListComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('sessionUser'));
  areaOptions = [];
  data = [];
  branchList = [];
  allAreas = [];
  settings = {
    add: {
      confirmCreate: true,
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      confirmSave: true,
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      branch_id: {
        title: 'ID',
        type: 'number',
        hide: true,
      },
      branch_name: {
        title: 'Branch Name',
        type: 'string',
      },
      store_name: {
        title: 'Store',
        type: 'string',
        hide: this.currentUser.role === 'superadmin' ? false : true,
      },
      area_name: {
        title: 'Area',
        type: 'html',
        valuePrepareFunction: (cell, row) => cell,
        editor: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [],
          },
        },
      },
      address: {
        title: 'Address',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData, private api: RestService,
    public router: Router, private toastrService: NbToastrService) { }

  ngOnInit() {
    if (this.currentUser.role === 'superadmin') {
      this.api.getBranchList().subscribe(result => {
        if (result['response']['status'] === 'success') {
          this.data = result['data'];
          this.source.load(this.data);
        } else {

        }
      });
    } else if (this.currentUser.role === 'admin') {
      this.api.getStoreBranchList(this.currentUser.store_id).subscribe(result => {
        if (result['response']['status'] === 'success') {
          this.data = result['data'];
          this.source.load(this.data);
        } else {

        }
      });
    }

    this.api.getAreaList().subscribe(result => {
      if (result['response']['status'] === 'success') {
        this.data = result['data'];
        this.allAreas = result.data;
        for (const l of this.allAreas) {
          this.areaOptions.push({ value: l.area_id, title: l.area_name });
        }
        this.settings.columns.area_name.editor.config.list = this.areaOptions;
        this.settings = Object.assign({}, this.settings);
      } else {

      }
    });


  }

  onCreateConfirm(event) {
    const currentUrl = this.router.url;
    const data = {
      'store_id': this.currentUser.role === 'superadmin' ?  event.newData.store_name : this.currentUser.store_id,
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
      'store_id': this.currentUser.role === 'superadmin' ?  event.newData.store_name : this.currentUser.store_id,
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
