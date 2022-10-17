import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { RestService } from '../../../@core/rest/rest.service';
import { SmartTableData } from '../../../@core/data/smart-table';
import { Routes, RouterModule, Router } from '@angular/router';
import { NbToastrService, NbToastrConfig } from '@nebular/theme';
import { NbButtonModule } from '@nebular/theme';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('sessionUser'));
  categoryOptions = [];
  typeOptions = [];
  dataAdmin = [];
  dataSuper = [];
  dataCategory = [];
  allCategory = [];
  allType = [];
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
      Detail:
      {
        title: 'Detail',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return `<a title="See Detail Product" href="pages/product/product-detail/${row.product_id}"> <i class="fa fa-eye"></i></a>`;
        },
        filter: false,
      },
      product_id: {
        title: 'ID',
        type: 'number',
        hide: true,
      },
      category_name: {
        title: 'Category',
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
      product_type: {
        title: 'Type',
        type: 'html',
        valuePrepareFunction: (cell, row) => cell,
        editor: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [{ value: 'single', title: 'Single' }, { 'value': 'variable', title: 'Variable' },
            { value: 'grouped', title: 'Grouped' }],
          },
        },
      },
      price_type: {
        title: 'Price Type',
        type: 'html',
        valuePrepareFunction: (cell, row) => cell,
        editor: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [{ value: 'fixed', title: 'Fixed' }, { 'value': 'slab', title: 'Slab' }],
          },
        },
      },
      product_name: {
        title: 'Name',
        type: 'string',
      },
      product_description: {
        title: 'Description',
        type: 'string',
      },
      product_price: {
        title: 'Price',
        type: 'string',
      },
      product_sku: {
        title: 'SKU',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData, private api: RestService,
    public router: Router, private toastrService: NbToastrService) { }

  ngOnInit() {
    if (this.currentUser.role === 'superadmin') {
      this.api.getProductList().subscribe(result => {
        if (result['response']['status'] === 'success') {
          this.dataSuper = result['data'];
          this.source.load(this.dataSuper);
        } else {

        }
      });

      this.api.getProductCategory().subscribe(result => {
        if (result['response']['status'] === 'success') {
          this.dataCategory = result['data'];
          this.allCategory = result.data;
          for (const l of this.allCategory) {
            this.categoryOptions.push({ value: l.product_category_id, title: l.product_category_name });
          }
          this.settings.columns.category_name.editor.config.list = this.categoryOptions;
          this.settings = Object.assign({}, this.settings);
        } else {

        }
      });

    } else if (this.currentUser.role === 'admin') {
      this.api.getStoreProductList(this.currentUser.store_id).subscribe(result => {
        if (result['response']['status'] === 'success') {
          this.dataAdmin = result['data'];
          this.source.load(this.dataAdmin);
        } else {

        }
      });

      this.api.getStoreProductCategory(this.currentUser.store_id).subscribe(result => {
        if (result['response']['status'] === 'success') {
          this.dataCategory = result['data'];
          this.allCategory = result.data;
          for (const l of this.allCategory) {
            this.categoryOptions.push({ value: l.product_category_id, title: l.product_category_name });
          }
          this.settings.columns.category_name.editor.config.list = this.categoryOptions;
          this.settings = Object.assign({}, this.settings);
        } else {

        }
      });
    }


    // this.api.getProductType().subscribe(result => {
    //   if(result['response']['status'] === 'success'){
    //     this.data = result['data'];
    //     this.allType = result.data;
    //     for (const l of this.allType) {
    //       this.typeOptions.push({ value: l.product_type_id, title: l.product_type });
    //     }
    //     this.settings.columns.product_type.editor.config.list = this.typeOptions;
    //     this.settings = Object.assign({}, this.settings);
    //   } else {

    //   }
    // })
  }

  onCreateConfirm(event) {
    const currentUrl = this.router.url;
    const data = {
      'store_id': this.currentUser.store_id,
      'product_name': event.newData.product_name,
      'product_description': event.newData.product_description,
      'product_price': event.newData.product_price,
      'product_type': event.newData.product_type,
      'price_type': event.newData.price_type,
      'product_sku': event.newData.product_sku,
      'product_category_id': event.newData.category_name,
      'product_type_id': event.newData.product_type_id,
      'created_by': this.currentUser.id,
    };
    this.api.addProduct(data).subscribe(result => {
      if (result['response']['status'] === 'success') {
        location.reload();
      } else {
        this.toastrService.danger('Fail!', 'Fail!');
      }
    });
  }

  onEditConfirm(event) {
    const currentUrl = this.router.url;
    const data = {
      'product_id': event.newData.product_id,
      'store_id': this.currentUser.store_id,
      'product_name': event.newData.product_name,
      'product_description': event.newData.product_description,
      'product_price': event.newData.product_price,
      'price_type': event.newData.price_type,
      'product_sku': event.newData.product_sku,
      'product_category_id': event.newData.product_category_id,
      'product_type': event.newData.product_type,
      'product_type_id': event.newData.product_type_id,
      'updated_by': this.currentUser.id,
    };
    this.api.updateProduct(data).subscribe(result => {
      if (result['response']['status'] === 'success') {
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
