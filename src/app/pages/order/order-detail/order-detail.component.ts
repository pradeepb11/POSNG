import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { RestService } from '../../../@core/rest/rest.service';
// import { SmartTableData } from '../../../@core/data/smart-table';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { NbToastrService, NbToastrConfig } from '@nebular/theme';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('sessionUser'));
  order_id: any;
  products: any;
  payment: any;
  amount = 0;
  payment_mode: any;
  payment_status: any;
  constructor(private api: RestService, public router: Router,
    private toastrService: NbToastrService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.order_id = this.activatedRoute.snapshot.paramMap.get('order_id');
    this.api.getOrderDetail(this.order_id).subscribe(result => {
      if (result['response']['status'] === 'success') {
        this.products = result['data']['order_products'];
        this.payment = result['data']['order_payment'];
        this.amount = this.payment.order_amount;
        this.payment_mode = this.payment.payment_mode;
        this.payment_status = this.payment.payment_status;
      } else {

      }
    });

    // this.api.getProductStock(this.product_id).subscribe(result => {
    //   if(result['response']['status'] == 'success'){
    //     this.productStock = result['data'];
    //     this.source1.load(this.productStock);
    //   } else {

    //   }
    // })
  }

  onCreateConfirm(event) {
    // let currentUrl = this.router.url;
    // var data = {"product_id" : this.product_id,
    //             "attribute_title" : event.newData.attribute_title,
    //             "attribute_value" : event.newData.attribute_value,
    //             "created_by" : this.currentUser.id
    //             };
    // this.api.addProductAttribute(data).subscribe(result => {
    //   if(result['response']['status'] == 'success'){
    //     if(this.toastrService.success("I'm a toast!", "Success!"))
    //     {
    //       location.reload()
    //     }
    //   } else {
    //     this.toastrService.danger("I'm a toast!", "Success!");
    //   }
    // })
  }

  onEditConfirm(event) {
    // let currentUrl = this.router.url;
    // var data = {
    //   "product_id" : this.product_id,
    //   "product_attribute_id" : event.newData.product_attribute_id,
    //   "attribute_title" : event.newData.attribute_title,
    //   "attribute_value" : event.newData.attribute_value,
    //   "updated_by" : this.currentUser.id
    // };
    // this.api.updateProductAttribute(data).subscribe(result => {
    //   if(result['response']['status'] == 'success'){
    //     // this.toastrService.success("I'm a toast!", "Success!");
    //     location.reload()
    //   } else {

    //   }
    // })
  }

  onDeleteConfirm(event): void {
    // if (window.confirm('Are you sure you want to delete?')) {
    //   this.api.deleteProductAttribute(event.data.product_attribute_id).subscribe(result => {
    //     if(result['response']['status'] == 'success'){
    //       location.reload()
    //     } else {

    //     }
    //   })
    //   event.confirm.resolve();
    // } else {
    //   event.confirm.reject();
    // }
  }

  onCreateConfirmS(event) {
    // let currentUrl = this.router.url;
    // var data = {"product_id" : this.product_id,
    //             "stock_quantity" : event.newData.stock_quantity,
    //             "created_by" : this.currentUser.id
    //             };
    // this.api.addProductStock(data).subscribe(result => {
    //   if(result['response']['status'] == 'success'){
    //     if(this.toastrService.success("I'm a toast!", "Success!"))
    //     {
    //       location.reload()
    //     }
    //   } else {
    //     this.toastrService.danger("I'm a toast!", "Success!");
    //   }
    // })
  }

  onEditConfirmS(event) {
    // let currentUrl = this.router.url;
    // var data = {
    //   "product_id" : event.newData.product_id,
    //   "product_name" : event.newData.product_name,
    //   "product_description" : event.newData.product_description,
    //   "product_price" : event.newData.product_price,
    //   "product_sku" : event.newData.product_sku,
    //   "updated_by" : this.currentUser.id
    // };
    // this.api.updateProductStock(data).subscribe(result => {
    //   if(result['response']['status'] == 'success'){
    //     // this.toastrService.success("I'm a toast!", "Success!");
    //     location.reload()
    //   } else {

    //   }
    // })
  }

  onDeleteConfirmS(event): void {
    //   if (window.confirm('Are you sure you want to delete?')) {
    //     this.api.deleteProductStock(event.data.product_id).subscribe(result => {
    //       if(result['response']['status'] == 'success'){
    //         location.reload()
    //       } else {

    //       }
    //     })
    //     event.confirm.resolve();
    //   } else {
    //     event.confirm.reject();
    //   }
  }
}
