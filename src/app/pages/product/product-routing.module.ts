import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductComponent } from './product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductTypeComponent } from './product-type/product-type.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { AttributeComponent } from './attribute/attribute.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { TreeGridComponent } from './tree-grid/tree-grid.component';

const routes: Routes = [{
  path: '',
  component: ProductComponent,
  children: [
    {
      path: 'product-list',
      component: ProductListComponent,
    },
    {
      path: 'product-detail/:product_id',
      component: ProductDetailComponent,
    },
    {
      path: 'product-type',
      component: ProductTypeComponent,
    },
    {
      path: 'product-category',
      component: ProductCategoryComponent,
    },
    {
      path: 'attribute',
      component: AttributeComponent,
    },
    {
      path: 'tree-grid',
      component: TreeGridComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule { }

export const routedComponents = [
  ProductComponent,
  ProductListComponent,
  ProductTypeComponent,
  ProductCategoryComponent,
  AttributeComponent,
  ProductDetailComponent,
  TreeGridComponent,
];
