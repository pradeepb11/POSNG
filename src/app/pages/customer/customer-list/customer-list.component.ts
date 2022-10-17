import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { RestService } from '../../../@core/rest/rest.service';
import { SmartTableData } from '../../../@core/data/smart-table';
import { Routes, RouterModule, Router } from '@angular/router';
import { NbToastrService, NbToastrConfig } from '@nebular/theme';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('sessionUser'));
  allCity = [];
  allState = [];
  cityOptions = [];
  stateOptions = [];
  data = [];
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
      customer_id: {
        title: 'ID',
        type: 'number',
        hide: true,
      },
      customer_first_name: {
        title: 'First Name',
        type: 'string',
      },
      customer_last_name: {
        title: 'Last Name',
        type: 'string',
      },
      dob: {
        title: 'DOB',
        type: 'string',
      },
      email: {
        title: 'Email',
        type: 'string',
      },
      phone: {
        title: 'Phone',
        type: 'string',
      },
      address:
      {
        title: 'Address',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return `<a title="See Customer Addresses "href="pages/customer/customer-address/${row.customer_id}"> <i class="fa fa-address-card"></i></a>`;
        },
        filter: false,
      },
      // state_id: {
      //   title: 'State',
      //   type: 'html',
      //   valuePrepareFunction: (cell, row) => { return cell },
      //   editor: {
      //     type: 'list',
      //     config: {
      //       selectText: 'Select',
      //       list: []
      //     }
      //   }
      // },
      // city_id: {
      //   title: 'City',
      //   type: 'html',
      //   valuePrepareFunction: (cell, row) => { return cell },
      //   editor: {
      //     type: 'list',
      //     config: {
      //       selectText: 'Select',
      //       list: []
      //     }
      //   }
      // },
      // address: {
      //   title: 'Address',
      //   type: 'string',
      // }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData, private api: RestService,
    public router: Router, private toastrService: NbToastrService) { }

  ngOnInit() {
    this.api.getCustomerList().subscribe(result => {
      if (result['response']['status'] === 'success') {
        this.data = result['data'];
        this.source.load(this.data);
      } else {

      }
    });

    // this.api.getStateList().subscribe(result => {
    //   if(result['response']['status'] === 'success'){
    //     this.data = result['data'];
    //     this.allState = result.data;
    //     console.log(this.allState)
    //     for (const l of this.allState) {
    //       this.stateOptions.push({ value: l.id, title: l.name });
    //     }
    //     this.settings.columns.state_id.editor.config.list = this.stateOptions;
    //     this.settings = Object.assign({}, this.settings);
    //   } else {

    //   }
    // })

    // this.api.getCityList().subscribe(result => {
    //   if(result['response']['status'] === 'success'){
    //     this.data = result['data'];
    //     this.allCity = result.data;
    //     for (const l of this.allCity) {
    //       this.cityOptions.push({ value: l.id, title: l.city_name });
    //     }
    //     this.settings.columns.city_id.editor.config.list = this.cityOptions;
    //     this.settings = Object.assign({}, this.settings);
    //   } else {

    //   }
    // })


  }

  onCreateConfirm(event) {
    const currentUrl = this.router.url;
    const data = {
      'customer_first_name': event.newData.customer_first_name,
      'customer_last_name': event.newData.customer_last_name,
      'dob': event.newData.dob,
      'email': event.newData.email,
      'mobile': event.newData.phone,
      'created_by': this.currentUser.id,
    };
    this.api.addCustomer(data).subscribe(result => {
      if (result['response']['status'] === 'success') {
        location.reload();
      } else {
        this.toastrService.danger('Fali!', 'Fail!');
      }
    });
  }

  onEditConfirm(event) {
    const currentUrl = this.router.url;
    const data = {
      'customer_id': event.newData.customer_id,
      'customer_first_name': event.newData.customer_first_name,
      'customer_last_name': event.newData.customer_last_name,
      'dob': event.newData.dob,
      'email': event.newData.email,
      'mobile': event.newData.phone,
      'updated_by': this.currentUser.id,
    };
    this.api.updateCustomer(data).subscribe(result => {
      if (result['response']['status'] === 'success') {
        // this.toastrService.success("I'm a toast!", "Success!");
        location.reload();
      } else {

      }
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.api.deleteCustomer(event.data.customer_id).subscribe(result => {
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
