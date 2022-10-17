import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { RestService } from '../../../@core/rest/rest.service';
import { SmartTableData } from '../../../@core/data/smart-table';
import { Routes, RouterModule, Router } from '@angular/router';
import { NbToastrService, NbToastrConfig } from '@nebular/theme';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('sessionUser'));
  roleOptions = [];
  storeOptions = [];
  branchOptions = [];
  data = [];
  employeeList = [];
  allRoles = [];
  allStores = [];
  allBranches = [];
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
      employee_id: {
        title: 'ID',
        type: 'number',
        hide: true,
      },
      employee_first_name: {
        title: 'First Name',
        type: 'string',
      },
      employee_last_name: {
        title: 'Last Name',
        type: 'string',
      },
      store_name: {
        title: 'Store',
        type: 'html',
        hide: this.currentUser.role === 'superadmin' ? false : true,
        valuePrepareFunction: (cell, row) => cell,
        editor: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [],
          },
        },
      },
      email: {
        title: 'Email',
        type: 'string',
      },
      phone: {
        title: 'Phone',
        type: 'string',
      },
      role: {
        title: 'Role',
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
      branch_name: {
        title: 'Branch',
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
      this.api.getEmployeeList().subscribe(result => {
        if (result['response']['status'] === 'success') {
          this.data = result['data'];
          this.source.load(this.data);
        } else {

        }
      });

      this.api.getBranchList().subscribe(result => {
        if (result['response']['status'] === 'success') {
          this.data = result['data'];
          this.allBranches = result.data;
          for (const l of this.allBranches) {
            this.branchOptions.push({ value: l.branch_id, title: l.branch_name });
          }
          this.settings.columns.branch_name.editor.config.list = this.branchOptions;
          this.settings = Object.assign({}, this.settings);
        } else {

        }
      });

      this.api.getStoreList().subscribe(result => {
        if (result['response']['status'] === 'success') {
          this.data = result['data'];
          this.allStores = result.data;
          for (const l of this.allStores) {
            this.storeOptions.push({ value: l.store_id, title: l.store_name });
          }
          this.settings.columns.store_name.editor.config.list = this.storeOptions;
          this.settings = Object.assign({}, this.settings);
        } else {

        }
      });

    } else if (this.currentUser.role === 'admin') {
      this.api.getStoreEmployeeList(this.currentUser.store_id).subscribe(result => {
        if (result['response']['status'] === 'success') {
          this.data = result['data'];
          this.source.load(this.data);
        } else {

        }
      });

      this.api.getStoreBranchList(this.currentUser.store_id).subscribe(result => {
        if (result['response']['status'] === 'success') {
          this.data = result['data'];
          this.allBranches = result.data;
          for (const l of this.allBranches) {
            this.branchOptions.push({ value: l.branch_id, title: l.branch_name });
          }
          this.settings.columns.branch_name.editor.config.list = this.branchOptions;
          this.settings = Object.assign({}, this.settings);
        } else {

        }
      });
    }

    this.api.getRoleList().subscribe(result => {
      if (result['response']['status'] === 'success') {
        this.data = result['data'];
        this.allRoles = result.data;
        for (const l of this.allRoles) {
          this.roleOptions.push({ value: l.role_id, title: l.role_name });
        }
        this.settings.columns.role.editor.config.list = this.roleOptions;
        this.settings = Object.assign({}, this.settings);
      } else {

      }
    });


  }

  onCreateConfirm(event) {
    const currentUrl = this.router.url;
    const data = {
      'employee_first_name': event.newData.employee_first_name,
      'employee_last_name': event.newData.employee_last_name,
      'role_id': event.newData.role,
      'store_id': this.currentUser.role === 'superadmin' ?  event.newData.store_name : this.currentUser.store_id,
      'branch_id': event.newData.branch_name,
      'email': event.newData.email,
      'mobile': event.newData.phone,
      'address': event.newData.address,
      'created_by': this.currentUser.id,
    };
    this.api.addEmployee(data).subscribe(result => {
      if (result['response']['status'] === 'success') {
        location.reload();
      } else {
        this.toastrService.danger('Fail', 'Fail');
      }
    });
  }

  onEditConfirm(event) {
    const currentUrl = this.router.url;
    const data = {
      'employee_id': event.newData.employee_id,
      'employee_first_name': event.newData.employee_first_name,
      'employee_last_name': event.newData.employee_last_name,
      'role_id': event.newData.role,
      'store_id': this.currentUser.role === 'superadmin' ?  event.newData.store_name : this.currentUser.store_id,
      'branch_id': event.newData.branch_name,
      'email': event.newData.email,
      'mobile': event.newData.phone,
      'address': event.newData.address,
      'updated_by': this.currentUser.id,
    };
    this.api.updateEmployee(data).subscribe(result => {
      if (result['response']['status'] === 'success') {
        location.reload();
      } else {

      }
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.api.deleteEmployee(event.data.employee_id).subscribe(result => {
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
