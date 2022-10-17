import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { RestService } from '../../../@core/rest/rest.service';
import { SmartTableData } from '../../../@core/data/smart-table';
import { Routes, RouterModule, Router } from '@angular/router';
import { NbToastrService, NbToastrConfig } from '@nebular/theme';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('sessionUser'));
  data = [];
  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
      },
    // add: {
    //   confirmCreate: false,
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
      Detail:
      {
        title: 'Detail',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return `<a title="See Detail Product "href="pages/order/order-detail/${row.order_id}"> <i class="nb-lightbulb"></i></a>`;
        },
        filter: false,
      },
      order_id: {
        title: 'ID',
        type: 'number',
        hide: true,
      },
      customer_id: {
        title: 'Customer Id',
        type: 'number',
        hide: true,
      },
      customer_name: {
        title: 'Customer',
        type: 'number',
      },
      discount_percentage: {
        title: 'Discount %',
        type: 'number',
      },
      discount_amount: {
        title: 'Discount $',
        type: 'number',
      },
      order_tax_amount: {
        title: 'Tax Amount',
        type: 'number',
      },
      order_sub_total: {
        title: 'Sub Total',
        type: 'number',
      },
      order_total: {
        title: 'Total',
        type: 'number',
      },
      order_type: {
        title: 'Type',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData, private api: RestService,
    public router: Router, private toastrService: NbToastrService) { }

  ngOnInit() {
    if (this.currentUser.role === 'superadmin') {
      this.api.getOrderList().subscribe(result => {
        if (result['response']['status'] === 'success') {
          this.data = result['data'];
          this.source.load(this.data);
        } else {

        }
      });
    } else if (this.currentUser.role === 'admin') {
      this.api.getStoreOrderList(this.currentUser.store_id).subscribe(result => {
        if (result['response']['status'] === 'success') {
          this.data = result['data'];
          this.source.load(this.data);
        } else {

        }
      });
    }
  }

  onCreateConfirm(event) {
    const currentUrl = this.router.url;
    const data = {
      'product_name': event.newData.product_name,
      'product_description': event.newData.product_description,
      'product_price': event.newData.product_price,
      'product_sku': event.newData.product_sku,
      'created_by': this.currentUser.id,
    };
    this.api.addProduct(data).subscribe(result => {
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
      'product_id': event.newData.product_id,
      'product_name': event.newData.product_name,
      'product_description': event.newData.product_description,
      'product_price': event.newData.product_price,
      'product_sku': event.newData.product_sku,
      'updated_by': this.currentUser.id,
    };
    this.api.updateProduct(data).subscribe(result => {
      if (result['response']['status'] === 'success') {
        // this.toastrService.success("I'm a toast!", "Success!");
        location.reload();
      } else {

      }
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.api.deleteProduct(event.data.product_id).subscribe(result => {
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
