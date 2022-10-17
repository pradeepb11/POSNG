import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { RestService } from '../../../@core/rest/rest.service';
import { SmartTableData } from '../../../@core/data/smart-table';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { NbToastrService, NbToastrConfig } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl, FormArray } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ProductDetailComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('sessionUser'));
  product_id: any;
  productAttributes = [];
  productStock = [];
  attributes = [];
  variations = [];
  attributeOptions = [];
  produyctAttributeOptions = [];
  productImages = [];
  attributesPresent = false;
  product_sku: any;
  product_type: any;
  price_type: any;
  product: any;
  item: any;
  currentInput: any;
  imageForm: FormGroup;
  showErrorMessage = false;
  submitted = false;
  loading = false;
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
      // product_id: {
      //   title: 'Product ID',
      //   type: 'number',
      // },
      product_attribute_id: {
        title: 'Attribute ID',
        type: 'number',
      },
      attribute_title: {
        title: 'Attribute Name',
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
      attribute_value: {
        title: 'Attribute Value',
        type: 'string',
      },
    },
  };

  settings1 = {
    actions: {
      add: false,
      edit: false,
      delete: false,
      },
    // add: {
    //   confirmCreate: true,
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
      stock_id: {
        title: 'Stock Id',
        type: 'number',
        hide: true,
      },
      sku: {
        title: 'SKU',
        type: 'number',
      },
      stock_quantity: {
        title: 'Stock Quantity',
        type: 'number',
      },
      stock_unit: {
        title: 'Unit',
        type: 'number',
      },
      branch_name: {
        title: 'Branch',
        type: 'string',
      },
    },
  };

  settings2 = {
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
      attribute_title: {
        title: 'Attribute Name',
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
      attribute_value: {
        title: 'Value',
        type: 'string',
      },
      product_price: {
        title: 'Price',
        type: 'number',
      },
      product_sku: {
        title: 'SKU',
        type: 'string',
      },
    },
  };

  @ViewChild('item') accordion;
  imageError: string;
  cardImageBase64 = [];
  isImageSaved: boolean;

  toggle() {
    this.accordion.toggle();
  }

  source: LocalDataSource = new LocalDataSource();
  source1: LocalDataSource = new LocalDataSource();
  source2: LocalDataSource = new LocalDataSource();

  constructor(
    private formBuilder: FormBuilder,
    public ngform: NgForm,
    private service: SmartTableData,
    private api: RestService,
    public router: Router,
    private toastrService: NbToastrService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.product_id = this.activatedRoute.snapshot.paramMap.get('product_id');
    const storeId = this.currentUser.store_id;
    this.api.getProductAttribute(this.product_id).subscribe(result => {
      if (result['response']['status'] === 'success') {
        this.productAttributes = result['data'];
        this.attributesPresent = true;
        this.source.load(this.productAttributes);
      } else {

      }
    });

    this.api.getStoreAttribute(storeId).subscribe(result => {
      if (result['response']['status'] === 'success') {
        this.attributes = result.data;
        for (const l of this.attributes) {
          this.attributeOptions.push({ value: l.attribute_id, title: l.attribute_name });
        }
        this.settings.columns.attribute_title.editor.config.list = this.attributeOptions;
        this.settings = Object.assign({}, this.settings);
      } else {

      }
    });

    this.api.getProductVariations(this.product_id).subscribe(result => {
      if (result['response']['status'] === 'success') {
        this.variations = result.data;
        this.source2.load(this.variations);
        for (const l of this.attributes) {
          for (const j of this.productAttributes) {
            if (l.attribute_id === j.attribute_id) {
              this.produyctAttributeOptions.push({ value: l.attribute_id, title: l.attribute_name });
            }
          }
        }
        this.settings2.columns.attribute_title.editor.config.list =
          this.produyctAttributeOptions.filter((value, index, self) =>
            self.map(x => x.attribute_id).indexOf(value.attribute_id) === index);
        this.settings2 = Object.assign({}, this.settings2);
      } else {

      }
    });

    this.api.getSingleProduct(this.product_id).subscribe(result => {
      if (result['response']['status'] === 'success') {
        this.product = result['data'];
        this.product_sku = result['data']['product_sku'];
        this.product_type = result['data']['product_type'];
        this.price_type = result['data']['price_type'];
        if (this.product_sku !== '') {
          this.api.getProductStock(this.product_sku).subscribe(result1 => {
            if (result1['response']['status'] === 'success') {
              this.productStock = result1['data'];
              this.source1.load(this.productStock);
            } else {

            }
          });
        }
      } else {

      }
    });

    this.api.getProductImageByProduct(this.product_id).subscribe(result => {
      if (result['response']['status'] === 'success') {
        this.productImages = result['data'];
      } else {

      }
    });

    this.imageForm = this.formBuilder.group({
      images: this.formBuilder.array([]),
    });
  }

  images(): FormArray {
    return this.imageForm.get('images') as FormArray;
  }

  newImage(): FormGroup {
    return this.formBuilder.group({
      product_id: this.product_id,
      image_title: '',
      product_image: '',
      position: '',
      alt_text: '',
      description: '',
      created_by: this.currentUser.id,
    });
  }

  addImage() {
    this.images().push(this.newImage());
  }

  removeImage(i: number) {
    const index: number = this.cardImageBase64.indexOf(i);
    this.images().removeAt(i);
    this.cardImageBase64.splice(index, i);
  }

  onCreateConfirm(event) {
    const currentUrl = this.router.url;
    const data = {
      'product_id': this.product_id,
      'attribute_id': event.newData.attribute_title,
      'attribute_value': event.newData.attribute_value,
      'created_by': this.currentUser.id,
    };
    this.api.addProductAttribute(data).subscribe(result => {
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
      'product_id': this.product_id,
      'product_attribute_id': event.newData.product_attribute_id,
      'attribute_title': event.newData.attribute_title,
      'attribute_value': event.newData.attribute_value,
      'updated_by': this.currentUser.id,
    };
    this.api.updateProductAttribute(data).subscribe(result => {
      if (result['response']['status'] === 'success') {
        location.reload();
      } else {

      }
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.api.deleteProductAttribute(event.data.product_attribute_id).subscribe(result => {
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

  onCreateConfirmS(event) {
    const currentUrl = this.router.url;
    const data = {
      'sku': this.product_sku,
      'stock_quantity': event.newData.stock_quantity,
      'created_by': this.currentUser.id,
    };
    this.api.addProductStock(data).subscribe(result => {
      if (result['response']['status'] === 'success') {
        location.reload();
      } else {
        this.toastrService.danger('Fail!', 'Fail!');
      }
    });
  }

  onEditConfirmS(event) {
    const currentUrl = this.router.url;
    const data = {
      'stock_id': event.newData.stock_id,
      'sku': event.newData.sku,
      'stock_quantity': event.newData.stock_quantity,
      'updated_by': this.currentUser.id,
    };
    this.api.updateProductStock(data).subscribe(result => {
      if (result['response']['status'] === 'success') {
        location.reload();
      } else {

      }
    });
  }

  onDeleteConfirmS(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.api.deleteProductStock(event.data.sku).subscribe(result => {
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

  onCreateConfirmV(event) {
    const currentUrl = this.router.url;
    const data = {
      'product_id': this.product_id,
      'product_sku': event.newData.product_sku,
      'product_price': event.newData.product_price,
      'attribute_id': event.newData.attribute_title,
      'attribute_value': event.newData.attribute_value,
      'created_by': this.currentUser.id,
    };
    this.api.addProductVariations(data).subscribe(result => {
      if (result['response']['status'] === 'success') {
        location.reload();
      } else {
        this.toastrService.danger('Fail!', 'Fail!');
      }
    });
  }

  onEditConfirmV(event) {
    const currentUrl = this.router.url;
    // var data = {
    //   "stock_id" : event.newData.stock_id,
    //   "sku" : event.newData.sku,
    //   "stock_quantity" : event.newData.stock_quantity,
    //   "updated_by" : this.currentUser.id
    // };
    // this.api.updateProductStock(data).subscribe(result => {
    //   console.log(result);
    //   if(result['response']['status'] === 'success'){
    //     location.reload()
    //   } else {

    //   }
    // })
  }

  onDeleteConfirmV(event): void {
    // if (window.confirm('Are you sure you want to delete?')) {
    //   this.api.deleteProductStock(event.data.sku).subscribe(result => {
    //     console.log(result);
    //     if(result['response']['status'] === 'success'){
    //       location.reload()
    //     } else {

    //     }
    //   })
    //   event.confirm.resolve();
    // } else {
    //   event.confirm.reject();
    // }
  }

  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    this.currentInput = fileInput.target.id;
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
            this.cardImageBase64.push(imgBase64Path);
            this.isImageSaved = true;
          }
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  onSubmit() {
    this.imageForm.value.images.forEach((element, x) => {
      this.imageForm.value.images[x].product_image = this.cardImageBase64[x];
    });
    const form_data = this.imageForm.value;
    this.api.addProductImages(form_data).subscribe(result => {
      if (result['response']['status'] === 'success') {
        location.reload();
      } else {

      }
    });
  }

  deleteProductImage(event, id): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.api.deleteProductImage(id).subscribe(result => {
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
