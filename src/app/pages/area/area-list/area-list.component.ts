import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { RestService } from '../../../@core/rest/rest.service';
import { SmartTableData } from '../../../@core/data/smart-table';
import { Routes, RouterModule, Router } from '@angular/router';
import { NbToastrService, NbToastrConfig } from '@nebular/theme';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.scss'],
})
export class AreaListComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('sessionUser'));
  cityOptions = [];
  stateOptions = [];
  data = [];
  areaList = [];
  allCity = [];
  allState = [];
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
      area_id: {
        title: 'ID',
        type: 'number',
        hide: true,
      },
      area_name: {
        title: 'Area Name',
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

  constructor(private service: SmartTableData, private api: RestService,
    public router: Router, private toastrService: NbToastrService) { }

  ngOnInit() {
    this.api.getAreaList().subscribe(result => {
      if (result['response']['status'] === 'success') {
        this.data = result['data'];
        this.source.load(this.data);
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
      'area_name': event.newData.area_name,
      'city_id': event.newData.city_name,
      'state_id': event.newData.state_name,
      'pincode': event.newData.pincode,
      'created_by': this.currentUser.id,
    };
    this.api.addArea(data).subscribe(result => {
      if (result['response']['status'] === 'success') {
        location.reload();
      } else {
        // this.toastrService.danger("I'm a toast!", "Success!");
      }
    });
  }

  onEditConfirm(event) {
    const currentUrl = this.router.url;
    const data = {
      'area_id': event.newData.area_id,
      'area_name': event.newData.area_name,
      'city_id': event.newData.city_id,
      'state_id': event.newData.state_id,
      'pincode': event.newData.pincode,
      'updated_by': this.currentUser.id,
    };
    this.api.updateArea(data).subscribe(result => {
      if (result['response']['status'] === 'success') {
        location.reload();
      } else {

      }
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.api.deleteArea(event.data.area_id).subscribe(result => {
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
