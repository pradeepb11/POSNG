import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RestService } from '../../../@core/rest/rest.service';
import { AuthService } from '../../../@core/rest/auth.service';
import { NbToastrService, NbToastrConfig } from '@nebular/theme';
// import { NbComponentShape, NbComponentSize, NbComponentStatus } from '@nebular/theme';
// import { NbSelectAppearance } from '@nebular/theme';
import * as _ from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-stepper',
  templateUrl: 'stock-add.component.html',
  styleUrls: ['stock-add.component.scss'],
})
export class StockAddComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('sessionUser'));
  stockForm: FormGroup;
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
  attributeList: any;
  branch: any;

  constructor(private fb: FormBuilder,
    public ngForm: NgForm,
    private httpClient: HttpClient,
    private api: RestService,
    private auth: AuthService,
    private router: Router,
    private toastrService: NbToastrService) {
  }

  ngOnInit() {

    this.api.getDefaultBranch(this.currentUser.store_id).subscribe(result => {
      if (result['response']['status'] === 'success') {
        this.branch = result['data'];
      } else {

      }
    });

    this.api.getStoreProductList(this.currentUser.store_id).subscribe(result => {
      if (result['response']['status'] === 'success') {
        this.productList = result['data'];
      } else {

      }
    });

    this.stockForm = this.fb.group({
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
    'product': [
      { type: 'required', message: 'Store Name is required.' },
    ],
    'attribute': [
      { type: 'required', message: 'Store Name is required.' },
    ],
    'quantity': [
      { type: 'required', message: 'Quantity is required.' },
    ],
  };

  // convenience getter for easy access to form fields
  get f2() {
    return this.stockForm.controls;
  }

  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {
        this.imageError =
          'Maximum size allowed is ' + max_size / 1000 + 'Mb';

        return false;
      }

      if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
        this.imageError = 'Only Images are allowed ( JPG | PNG )';
        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          if (img_height > max_height && img_width > max_width) {
            this.imageError =
              'Maximum dimentions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';
            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.logoString = imgBase64Path;
            this.isImageSaved = true;
          }
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
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
    this.submitted = true;
    if (this.stockForm.invalid) {
      this.showErrorMessage = true;
      this.error = true;
    } else {
      const data = {
        'store_id': this.currentUser.store_id,
        'to_branch': this.branch.branch_id,
        'product_id': this.stockForm.value.product,
        'product_attribute_id': this.stockForm.value.attribute,
        'quantity': this.stockForm.value.quantity,
        'created_by': this.currentUser.id,
      };
      // console.log(this.storeName)
      this.api.addProductStock(data).subscribe(result => {
        if (result['response']['status'] === 'success') {
          location.reload();
        } else {
          this.toastrService.danger('Fail!', 'Fail!');
        }
      });
    }
  }
}
