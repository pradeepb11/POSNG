import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { RestService } from '../../../@core/rest/rest.service';
import { SmartTableData } from '../../../@core/data/smart-table';
import { Routes, RouterModule, Router } from '@angular/router';
import { NbToastrService, NbToastrConfig } from '@nebular/theme';
import { NbButtonModule } from '@nebular/theme';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.scss'],
})
export class AttributeComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('sessionUser'));
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
      attribute_id: {
        title: 'ID',
        type: 'number',
        hide: true,
      },
      attribute_name: {
        title: 'Attribute Name',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData, private api: RestService,
    public router: Router, private toastrService: NbToastrService) { }

  ngOnInit() {
    const storeId = this.currentUser.store_id;
    this.api.getStoreAttribute(storeId).subscribe(result => {
      if (result['response']['status'] === 'success') {
        this.data = result['data'];
        this.source.load(this.data);
      } else {

      }
    });
  }

  onCreateConfirm(event) {
    const currentUrl = this.router.url;
    const data = {
      'store_id': this.currentUser.store_id,
      'attribute_name': event.newData.attribute_name,
      'created_by': this.currentUser.id,
    };
    this.api.addAttribute(data).subscribe(result => {
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
      'attribute_id': event.newData.attribute_id,
      'store_id': this.currentUser.store_id,
      'attribute_name': event.newData.attribute_name,
      'updated_by': this.currentUser.id,
    };
    this.api.updateAttribute(data).subscribe(result => {
      if (result['response']['status'] === 'success') {
        location.reload();
      } else {

      }
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.api.deleteAttribute(event.data.attribute_id).subscribe(result => {
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
