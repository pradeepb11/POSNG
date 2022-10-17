import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RestService } from '../../../@core/rest/rest.service';
import { AuthService } from '../../../@core/rest/auth.service';
import { NbStepperComponent, NbToastrService, NbToastrConfig } from '@nebular/theme';
import { NbComponentShape, NbComponentSize, NbComponentStatus } from '@nebular/theme';
import { NbSelectAppearance } from '@nebular/theme';
import * as _ from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-stepper',
  templateUrl: 'store-add.component.html',
  styleUrls: ['store-add.component.scss'],
})
export class StoreAddComponent implements OnInit {
  @ViewChild('stepper') stepper: NbStepperComponent;
  currentUser = JSON.parse(localStorage.getItem('sessionUser'));
  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;
  submitted1 = false;
  submitted2 = false;
  submitted3 = false;
  submittedAll = false;
  success = false;
  error = false;
  showErrorMessage = false;
  successMessage: any;
  errorMessage: any;
  imageError: string;
  cardImageBase64: any;
  isImageSaved: boolean;
  logoString: string;
  storeName: any;
  storeConfig: any;
  storeAdmin: any;
  storeId: any;
  states = [];
  cities = [];
  areas = [];
  selectedState: any;
  currencies = [{'name': 'INR', 'value': 'INR'}, {'name': 'USD', 'value': 'USD'}, {'name': 'SAR', 'value': 'SAR'}, {'name': 'BHD', 'value': 'BHD'}];

  constructor(private fb: FormBuilder,
    public ngForm: NgForm,
    private httpClient: HttpClient,
    private api: RestService,
    private auth: AuthService,
    private router: Router,
    private toastrService: NbToastrService) {
  }

  ngOnInit() {

    this.api.getStateList().subscribe(result => {
      if (result['response']['status'] === 'success') {
        this.states = result['data'];
      } else {
        this.states = [];
      }
    });

    this.firstForm = this.fb.group({
      // storeName: ['', Validators.required],
      storeName: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    });

    this.secondForm = this.fb.group({
      storeLogo: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      currency: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      storeAddress1: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      storeAddress2: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      area: new FormControl('', Validators.compose([
        Validators.required, Validators.pattern(/^[0-9]\d*$/),
      ])),
      pincode: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      city: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      state: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    });

    this.thirdForm = this.fb.group({
      // thirdCtrl: ['', Validators.required],
      firstName: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      lastName: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      phone: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    });
  }

  validation_messages = {
    'storeName': [
      { type: 'required', message: 'Store Name is required.' },
    ],
    'storeLogo': [
      { type: 'required', message: 'Store Name is required.' },
    ],
    'pincode': [
      { type: 'required', message: 'Pincode is required.' },
    ],
    'firstName': [
      { type: 'required', message: 'First Name is required.' },
    ],
    'lastName': [
      { type: 'required', message: 'Last Name is required.' },
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
    ],
    'phone': [
      { type: 'required', message: 'Phone is required.' },
    ],

  };

  // convenience getter for easy access to form fields
  get f1() {
    return this.firstForm.controls;
  }

  get f2() {
    return this.secondForm.controls;
  }

  get f3() {
    return this.thirdForm.controls;
  }

  getCityFromState(state) {
    this.api.getCityByState(state).subscribe(result => {
      if (result['response']['status'] === 'success') {
        this.cities = result['data'];
      } else {
        this.cities = [];
      }
    });
  }

  getAreaByPincode(event) {
    const pincode = event.target.value;
    this.api.getAreaByPincode(pincode).subscribe(result => {
      if (result['response']['status'] === 'success') {
        this.areas = result['data'];
      } else {
        this.areas = [];
      }
    });
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

  onFirstSubmit() {
    this.storeName = {
      'store_name': this.firstForm.value.storeName,
      'created_by': this.currentUser.id,
    };
    // console.log(this.storeName)
    this.firstForm.markAsDirty();
  }

  onSecondSubmit() {
    this.storeConfig = {
      'store_logo': this.logoString,
      'currency': this.secondForm.value.currency,
      'address_1': this.secondForm.value.storeAddress1,
      'address_2': this.secondForm.value.storeAddress2,
      'city_id': this.secondForm.value.city,
      'state_id': this.secondForm.value.state,
      'pincode': this.secondForm.value.pincode,
      'area_id': this.secondForm.value.area,
      'created_by': this.currentUser.id,
    };
    // console.log(this.storeConfig)
    this.secondForm.markAsDirty();
  }

  onThirdSubmit() {
    this.storeAdmin = {
      'first_name': this.thirdForm.value.firstName,
      'last_name': this.thirdForm.value.lastName,
      'email': this.thirdForm.value.email,
      'mobile': this.thirdForm.value.phone,
      'password': 'password',
      'role_id': 1,
    };
    // console.log(this.storeAdmin)
    this.finalSubmit();
    this.thirdForm.markAsDirty();
  }

  finalSubmit() {
    this.api.addStore(this.storeName).subscribe(result => {
      if (result['response']['status'] === 'success') {
        this.storeId = result['data']['store_id'];
        this.submitted1 = true;
        this.storeConfig.store_id = this.storeId;
        this.api.addStoreConfig(this.storeConfig).subscribe(result1 => {
          if (result1['response']['status'] === 'success') {
            this.storeAdmin.store_id = this.storeId;
            this.submitted2 = true;
            this.auth.register(this.storeAdmin).subscribe(result2 => {
              if (result2['status'] === 'success') {
                const branchData = {
                  'store_id': this.storeId,
                  'is_default': 1,
                  'branch_name': 'Main Branch',
                  'area_id': this.storeConfig.area_id,
                  'address': this.storeConfig.address_1,
                  'created_by': this.currentUser.id,
                };
                this.api.addBranch(branchData).subscribe(result3 => {
                  if (result3['response']['status'] === 'success') {
                    this.submitted3 = true;
                  this.router.navigate(['pages/store/store-list']);
                  this.successMessage = 'Store Crested Succesfully!!';
                  } else {
                    this.showErrorMessage = true;
                    this.error = true;
                    this.errorMessage = 'Unable to Add Store Admin';
                  }
                });
              } else {
                this.showErrorMessage = true;
                this.error = true;
                this.errorMessage = 'Unable to Add Store Admin';
              }
            });
          } else {
            this.showErrorMessage = true;
            this.error = true;
            this.errorMessage = 'Unable to Add Store Config';
          }
        });
      } else {
        this.showErrorMessage = true;
        this.error = true;
        this.errorMessage = 'Unable to Add Store';
      }
    });
  }

}

