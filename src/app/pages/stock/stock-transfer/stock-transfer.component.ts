import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RestService } from '../../../@core/rest/rest.service';
import { AuthService } from '../../../@core/rest/auth.service';
import { NbToastrService, NbToastrConfig } from '@nebular/theme';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-stepper',
  templateUrl: 'stock-transfer.component.html',
  styleUrls: ['stock-transfer.component.scss'],
})
export class StockTransferComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('sessionUser'));
  transferForm: FormGroup;
  success = false;
  error = false;
  submitted = false;
  showErrorMessage = false;
  successMessage: any;
  errorMessage: any;
  imageError: string;
  cardImageBase64: any;
  isImageSaved: boolean;
  logoString: string;
  storeId: any;
  productList: any;
  branchList: any;
  attributeList: any;
  branch: any;

  constructor(private fb: FormBuilder,
    public ngForm: NgForm,
    private httpClient: HttpClient,
    private api: RestService,
    private auth: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastrService: NbToastrService) {
  }

  ngOnInit() {

    this.api.getStoreBranchList(this.currentUser.store_id).subscribe(result => {
      if (result['response']['status'] === 'success') {
        this.branchList = result['data'];
      } else {

      }
    });

    this.api.getStoreProductList(this.currentUser.store_id).subscribe(result => {
      if (result['response']['status'] === 'success') {
        this.productList = result['data'];
      } else {

      }
    });

    this.transferForm = this.fb.group({
      fromBranch: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      toBranch: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      product: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      attribute: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      quantity: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    });
  }

  validation_messages = {
    'quantity': [
      { type: 'required', message: 'Quantity is required.' },
    ],
    'fromBranch': [
      { type: 'required', message: 'From Branch is required.' },
    ],
    'toBranch': [
      { type: 'required', message: 'To Branch is required.' },
    ],
    'product': [
      { type: 'required', message: 'Product is required.' },
    ],
    'atribuite': [
      { type: 'required', message: 'Atribute is required.' },
    ],
  };

  // convenience getter for easy access to form fields
  get f2() {
    return this.transferForm.controls;
  }

  getAttributeByProduct(product) {
    this.api.getProductAttribute(product).subscribe(result => {
      if (result['response']['status'] === 'success') {
        this.attributeList = result['data'];
      } else {
        this.attributeList = [];
      }
    });
  }

  onSubmit() {
    const data = {
      'store_id': this.currentUser.store_id,
      'from_branch': this.transferForm.value.fromBranch,
      'to_branch': this.transferForm.value.toBranch,
      'product_id': this.transferForm.value.product,
      'product_attribute_id': this.transferForm.value.attribute,
      'quantity': this.transferForm.value.quantity,
      'created_by': this.currentUser.id,
    };
    this.api.transferProductStock(data).subscribe(result => {
      if (result['response']['status'] === 'success') {
        location.reload();
      } else {
        this.toastrService.danger('Fail!', 'Fail!');
      }
    });
  }
}

