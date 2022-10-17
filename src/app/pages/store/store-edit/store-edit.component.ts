import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RestService } from '../../../@core/rest/rest.service';
import { AuthService } from '../../../@core/rest/auth.service';
import { NbStepperComponent, NbToastrService, NbToastrConfig } from '@nebular/theme';
import { NbComponentShape, NbComponentSize, NbComponentStatus } from '@nebular/theme';
import { NbSelectAppearance } from '@nebular/theme';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-stepper',
  templateUrl: 'store-edit.component.html',
  styleUrls: ['store-edit.component.scss'],
})
export class StoreEditComponent implements OnInit {
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
  storeConfigId: any;
  store_name: any;
  store: any;
  states = [];
  cities = [];
  areas = [];
  selectedState: any;
  currencies = [{'name': 'INR', 'value': 'INR'}, {'name': 'USD', 'value': 'USD'}, {'name': 'SAR', 'value': 'SAR'}, {'name': 'BHD', 'value': 'BHD'}];
  oldCurrency = '';
  oldState = '';
  oldCity = '';
  oldArea = '';

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
    this.storeId = this.activatedRoute.snapshot.paramMap.get('store_id');
    this.api.getStore(this.storeId).subscribe(result => {
      if (result['response']['status'] === 'success') {
        this.store = result['data'];
        this.store_name = this.store.store_name;
        this.firstForm.get('storeName').setValue(this.store_name);
      } else {
        this.states = [];
      }
    });

    this.api.getStoreConfigByStore(this.storeId).subscribe(result => {
      if (result['response']['status'] === 'success') {
        this.storeConfig = result['data'];
        this.storeConfigId = this.storeConfig.store_config_id;
        this.oldCurrency = this.storeConfig.currency;
        this.oldState = this.storeConfig.state_id;
        this.oldCity = this.storeConfig.city_id;
        this.oldArea = this.storeConfig.area_id;
        this.secondForm.get('storeAddress1').setValue(this.storeConfig.address_1);
        this.secondForm.get('storeAddress2').setValue(this.storeConfig.address_2);
        this.secondForm.get('pincode').setValue(this.storeConfig.pincode);
        this.secondForm.get('state').setValue(this.oldState);
        this.secondForm.get('city').setValue(this.oldCity);
        this.secondForm.get('area').setValue(this.oldArea);
        this.secondForm.get('currency').setValue(this.oldCurrency);
        if (this.oldState !== '') {
          this.api.getCityByState(this.oldState).subscribe(result1 => {
            if (result1['response']['status'] === 'success') {
              this.cities = result1['data'];
            } else {
              this.cities = [];
            }
          });
        }

        if (this.storeConfig.pincode !== '') {
          this.api.getAreaByPincode(this.storeConfig.pincode).subscribe(result1 => {
            if (result1['response']['status'] === 'success') {
              this.areas = result1['data'];
            } else {
              this.areas = [];
            }
          });
        }
      } else {
        // this.states = [];
      }
    });

    this.api.getStateList().subscribe(result => {
      if (result['response']['status'] === 'success') {
        this.states = result['data'];
      } else {
        this.states = [];
      }
    });

    this.api.getStoreAdmin(this.storeId).subscribe(result => {
      if (result['response']['status'] === 'success') {
        this.storeAdmin = result['data'];
        const fullName = this.storeAdmin.name;
        const x = fullName.split(' ');
        this.thirdForm.get('firstName').setValue(x[0]);
        this.thirdForm.get('lastName').setValue(x[1]);
        this.thirdForm.get('phone').setValue(this.storeAdmin.mobile);
        this.thirdForm.get('email').setValue(this.storeAdmin.email);
      } else {
        this.storeAdmin = [];
      }
    });

    this.firstForm = this.fb.group({
      // storeName: ['', Validators.required],
      storeName: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    });

    this.secondForm = this.fb.group({
      storeLogo: new FormControl(''),
      currency: new FormControl(this.oldCurrency),
      storeAddress1: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      storeAddress2: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      area: new FormControl(this.oldArea),
      pincode: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      city: new FormControl(this.oldCity),
      state: new FormControl(this.oldState),
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
      'store_id': this.storeId,
      'store_name': this.firstForm.value.storeName,
      'updated_by': this.currentUser.id,
    };
    this.firstForm.markAsDirty();
  }

  onSecondSubmit() {
    this.storeConfig = {
      'store_config_id': this.storeConfigId,
      'store_logo': this.logoString,
      'currency': this.secondForm.value.currency,
      'address_1': this.secondForm.value.storeAddress1,
      'address_2': this.secondForm.value.storeAddress2,
      'city_id': this.secondForm.value.city,
      'state_id': this.secondForm.value.state,
      'pincode': this.secondForm.value.pincode,
      'area_id': this.secondForm.value.area,
      'updated_by': this.currentUser.id,
    };
    this.secondForm.markAsDirty();
  }

  onThirdSubmit() {
    this.storeAdmin = {
      'id': this.storeAdmin.id,
      'first_name': this.thirdForm.value.firstName,
      'last_name': this.thirdForm.value.lastName,
      'email': this.thirdForm.value.email,
      'mobile': this.thirdForm.value.phone,
      'role_id': 1,
    };
    this.finalSubmit();
    this.thirdForm.markAsDirty();
  }

  finalSubmit() {
    this.api.updateStore(this.storeName).subscribe(result => {
      if (result['response']['status'] === 'success') {
        this.storeId = result['data']['store_id'];
        this.submitted1 = true;
        this.storeConfig.store_id = this.storeId;
        this.api.updateStoreConfig(this.storeConfig).subscribe(result1 => {
          if (result1['response']['status'] === 'success') {
            this.storeAdmin.store_id = this.storeId;
            this.submitted2 = true;
            this.api.updateUser(this.storeAdmin).subscribe(result2 => {
              if (result2['response']['status'] === 'success') {
                this.submitted3 = true;
                this.router.navigate(['pages/store/store-list']);
              } else {
                this.showErrorMessage = true;
                this.error = true;
                this.errorMessage = 'Unable to Update Store Admin';
              }
            });
          } else {
            this.showErrorMessage = true;
            this.error = true;
            this.errorMessage = 'Unable to Update Store Config';
          }
        });
      } else {
        this.showErrorMessage = true;
        this.error = true;
        this.errorMessage = 'Unable to Update Store';
      }
    });
  }

}

