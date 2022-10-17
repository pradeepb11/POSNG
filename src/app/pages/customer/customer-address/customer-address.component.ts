import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { RestService } from '../../../@core/rest/rest.service';
import { SmartTableData } from '../../../@core/data/smart-table';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { NbToastrService, NbToastrConfig } from '@nebular/theme';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './customer-address.component.html',
  styleUrls: ['./customer-address.component.scss'],
})
export class CustomerAddressComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('sessionUser'));
  customer_id: any;
  first_name: any;
  last_name: any;
  allCity = [];
  allState = [];
  customer: any;
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
      customer_address_id: {
        title: 'ID',
        type: 'number',
        hide: true,
      },
      address1: {
        title: 'Room No/Building',
        type: 'string',
      },
      address2: {
        title: 'Street',
        type: 'string',
      },
      address3: {
        title: 'Locality',
        type: 'string',
      },
      state_name: {
        title: 'State',
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
      city_name: {
        title: 'City',
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
      pincode: {
        title: 'Pincode',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData, private api: RestService, public router: Router,
    private toastrService: NbToastrService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.customer_id = this.activatedRoute.snapshot.paramMap.get('customer_id');
    this.api.getCustomerAddress(this.customer_id).subscribe(result => {
      if (result['response']['status'] === 'success') {
        this.data = result['data'];
        this.source.load(this.data);
      } else {

      }
    });

    this.api.getCustomer(this.customer_id).subscribe(result => {
      if (result['response']['status'] === 'success') {
        this.customer = result['data'];
        this.first_name = this.customer.customer_first_name;
        this.last_name = this.customer.customer_last_name;
      } else {

      }
    });

    this.api.getStateList().subscribe(result => {
      if (result['response']['status'] === 'success') {
        this.data = result['data'];
        this.allState = result.data;
        for (const l of this.allState) {
          this.stateOptions.push({ value: l.id, title: l.name });
        }
        this.settings.columns.state_name.editor.config.list = this.stateOptions;
        this.settings = Object.assign({}, this.settings);
      } else {

      }
    });

    this.api.getCityList().subscribe(result => {
      if (result['response']['status'] === 'success') {
        this.data = result['data'];
        this.allCity = result.data;
        for (const l of this.allCity) {
          this.cityOptions.push({ value: l.id, title: l.city_name });
        }
        this.settings.columns.city_name.editor.config.list = this.cityOptions;
        this.settings = Object.assign({}, this.settings);
      } else {

      }
    });


  }

  onCreateConfirm(event) {
    const currentUrl = this.router.url;
    const data = {
      'customer_id': this.customer_id,
      'city_id': event.newData.city_name,
      'state_id': event.newData.state_name,
      'address1': event.newData.address1,
      'address2': event.newData.address2,
      'address3': event.newData.address3,
      'pincode': event.newData.pincode,
      'created_by': this.currentUser.id,
    };
    this.api.addCustomerAddress(data).subscribe(result => {
      if (result['response']['status'] === 'success') {
        location.reload();
      } else {
        this.toastrService.danger('Fail', 'Fail!');
      }
    });
  }

  onEditConfirm(event) {
    const currentUrl = this.router.url;
    const data = {
      'customer_address_id': event.newData.customer_address_id,
      'customer_id': this.customer_id,
      'city_id': event.newData.city_name,
      'state_id': event.newData.state_name,
      'address1': event.newData.address1,
      'address2': event.newData.address2,
      'address3': event.newData.address3,
      'pincode': event.newData.pincode,
      'updated_by': this.currentUser.id,
    };
    this.api.updateCustomerAddress(data).subscribe(result => {
      if (result['response']['status'] === 'success') {
        // this.toastrService.success("I'm a toast!", "Success!");
        location.reload();
      } else {

      }
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.api.deleteCustomerAddress(event.data.customer_address_id).subscribe(result => {
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
