import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  // baseUrl = 'http://localhost/pos-api/public/index.php/api/v1';
  baseUrl = 'https://testing.paynet.co.in/pos-api/public/index.php/api/v1';
  httpOptions: {};
  constructor(private http: HttpClient) { }
  getHeader() {
    const currentUser = JSON.parse(localStorage.getItem('sessionUser'));
    return this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + ' ' + currentUser.token,
      }),
    };
  }
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        'Backend returned code: ' + error.status + ' body was: ' + error.message);
    }
    return throwError(
      'Something bad happened; please try again later.',
    );
  }

  // login(data) {
  //   return this.http.post<any>(this.baseUrl + '/product',data);
  // }

  // User
  getStoreAdmin(storeId) {
    return this.http.get<any>(this.baseUrl + '/user/store_admin/' + storeId, this.getHeader());
  }

  updateUser(data) {
    return this.http.put<any>(this.baseUrl + '/user', data, this.getHeader());
  }
  // User

  // All State List
  getStateList() {
    return this.http.get<any>(this.baseUrl + '/states', this.getHeader());
  }

  // All City List
  getCityList() {
    return this.http.get<any>(this.baseUrl + '/cities', this.getHeader());
  }
  getCityByState(id) {
    return this.http.get<any>(this.baseUrl + '/city/state/' + id, this.getHeader());
  }

  // Area Crud API's Start
  getAreaList() {
    return this.http.get<any>(this.baseUrl + '/area', this.getHeader());
  }

  getAreaByPincode(pincode) {
    return this.http.get<any>(this.baseUrl + '/area/pincode/' + pincode, this.getHeader());
  }

  addArea(data) {
    return this.http.post<any>(this.baseUrl + '/area', data, this.getHeader());
  }

  updateArea(data) {
    return this.http.put<any>(this.baseUrl + '/area', data, this.getHeader());
  }

  deleteArea(id) {
    return this.http.delete<any>(this.baseUrl + '/area/' + id, this.getHeader());
  }
  // Area Crud API's End

  // Branch Crud API's Start
  getBranchList() {
    return this.http.get<any>(this.baseUrl + '/branch', this.getHeader());
  }

  getStoreBranchList(storeId) {
    return this.http.get<any>(this.baseUrl + '/branch/store/' + storeId, this.getHeader());
  }

  getDefaultBranch(storeId) {
    return this.http.get<any>(this.baseUrl + '/branch/default/' + storeId, this.getHeader());
  }

  addBranch(data) {
    return this.http.post<any>(this.baseUrl + '/branch', data, this.getHeader());
  }

  updateBranch(data) {
    return this.http.put<any>(this.baseUrl + '/branch', data, this.getHeader());
  }

  deleteBranch(id) {
    return this.http.delete<any>(this.baseUrl + '/branch/' + id, this.getHeader());
  }
  // Branch Crud API's End

  // Customer Crud API's Start
  getCustomer(id) {
    return this.http.get<any>(this.baseUrl + '/customer/find/' + id, this.getHeader());
  }

  getCustomerList() {
    return this.http.get<any>(this.baseUrl + '/customer', this.getHeader());
  }

  addCustomer(data) {
    return this.http.post<any>(this.baseUrl + '/customer', data, this.getHeader());
  }

  updateCustomer(data) {
    return this.http.put<any>(this.baseUrl + '/customer', data, this.getHeader());
  }

  deleteCustomer(id) {
    return this.http.delete<any>(this.baseUrl + '/customer/' + id, this.getHeader());
  }
  // Customer Crud API's End

  // Customer Address API's Start
  getCustomerAddress(id) {
    return this.http.get<any>(this.baseUrl + '/customer_address/customer/' + id, this.getHeader());
  }

  addCustomerAddress(data) {
    return this.http.post<any>(this.baseUrl + '/customer_address', data, this.getHeader());
  }

  updateCustomerAddress(data) {
    return this.http.put<any>(this.baseUrl + '/customer_address', data, this.getHeader());
  }

  deleteCustomerAddress(id) {
    return this.http.delete<any>(this.baseUrl + '/customer_address/' + id, this.getHeader());
  }
  // Customer Address API's End

  // Product Type Crud API's Start
  getProductType() {
    return this.http.get<any>(this.baseUrl + '/product_type', this.getHeader());
  }

  addProductType(data) {
    return this.http.post<any>(this.baseUrl + '/product_type', data, this.getHeader());
  }

  updateProductType(data) {
    return this.http.put<any>(this.baseUrl + '/product_type', data, this.getHeader());
  }

  deleteProductType(id) {
    return this.http.delete<any>(this.baseUrl + '/product_type/' + id, this.getHeader());
  }
  // Product Type Crud API's End

  // Product Image Crud API's Start
  getAllProductImages() {
    return this.http.get<any>(this.baseUrl + '/product_image', this.getHeader());
  }

  getProductImage(id) {
    return this.http.get<any>(this.baseUrl + '/product_image/find/' + id, this.getHeader());
  }

  getProductImageByProduct(id) {
    return this.http.get<any>(this.baseUrl + '/product_image/product/' + id, this.getHeader());
  }

  addProductImages(data) {
    return this.http.post<any>(this.baseUrl + '/product_image', data, this.getHeader());
  }

  updateProductImage(data) {
    return this.http.put<any>(this.baseUrl + '/product_image', data, this.getHeader());
  }

  deleteProductImage(id) {
    return this.http.delete<any>(this.baseUrl + '/product_image/' + id, this.getHeader());
  }
  // Product Image Crud API's End

  // Product Category Crud API's Start
  getProductCategory() {
    return this.http.get<any>(this.baseUrl + '/product_category', this.getHeader());
  }

  getStoreProductCategory(id) {
    return this.http.get<any>(this.baseUrl + '/product_category/store/' + id, this.getHeader());
  }

  addProductCategory(data) {
    return this.http.post<any>(this.baseUrl + '/product_category', data, this.getHeader());
  }

  updateProductCategory(data) {
    return this.http.put<any>(this.baseUrl + '/product_category', data, this.getHeader());
  }

  deleteProductCategory(id) {
    return this.http.delete<any>(this.baseUrl + '/product_category/' + id, this.getHeader());
  }
  // Product Category Crud API's Start

  // Attribute Crud API's Start
  getAttribute() {
    return this.http.get<any>(this.baseUrl + '/attribute', this.getHeader());
  }

  getStoreAttribute(storeId) {
    return this.http.get<any>(this.baseUrl + '/attribute/store/' + storeId, this.getHeader());
  }

  addAttribute(data) {
    return this.http.post<any>(this.baseUrl + '/attribute', data, this.getHeader());
  }

  updateAttribute(data) {
    return this.http.put<any>(this.baseUrl + '/attribute', data, this.getHeader());
  }

  deleteAttribute(id) {
    return this.http.delete<any>(this.baseUrl + '/attribute/' + id, this.getHeader());
  }
  // Attribute Crud API's Start

  // Product Crud API's Start
  getProductList() {
    return this.http.get<any>(this.baseUrl + '/product', this.getHeader());
  }

  getStoreProductList(storeId) {
    return this.http.get<any>(this.baseUrl + '/product/store/' + storeId, this.getHeader());
  }

  getSingleProduct(id) {
    return this.http.get<any>(this.baseUrl + '/product/find/' + id, this.getHeader());
  }

  addProduct(data) {
    return this.http.post<any>(this.baseUrl + '/product', data, this.getHeader());
  }

  updateProduct(data) {
    return this.http.put<any>(this.baseUrl + '/product', data, this.getHeader());
  }

  deleteProduct(id) {
    return this.http.delete<any>(this.baseUrl + '/product/' + id, this.getHeader());
  }
  // Product Crud API's Start

  // Product Attribute Crud API's Start
  getProductAttribute(id) {
    return this.http.get<any>(this.baseUrl + '/product_attribute/product/' + id, this.getHeader());
  }

  addProductAttribute(data) {
    return this.http.post<any>(this.baseUrl + '/product_attribute', data, this.getHeader());
  }

  updateProductAttribute(data) {
    return this.http.put<any>(this.baseUrl + '/product_attribute', data, this.getHeader());
  }

  deleteProductAttribute(id) {
    return this.http.delete<any>(this.baseUrl + '/product_attribute/' + id, this.getHeader());
  }
  // Product Attribute Crud API's End

  // Product Stock Crud API's Start
  getBranchStock(id) {
    return this.http.get<any>(this.baseUrl + '/stock/branch/' + id, this.getHeader());
  }

  getProductStock(sku) {
    return this.http.get<any>(this.baseUrl + '/stock/product/' + sku, this.getHeader());
  }

  addProductStock(data) {
    return this.http.post<any>(this.baseUrl + '/stock', data, this.getHeader());
  }

  transferProductStock(data) {
    return this.http.post<any>(this.baseUrl + '/stock/transfer', data, this.getHeader());
  }

  updateProductStock(data) {
    return this.http.put<any>(this.baseUrl + '/stock/product', data, this.getHeader());
  }

  deleteProductStock(id) {
    return this.http.get<any>(this.baseUrl + '/stock/product/' + id, this.getHeader());
  }
  // Product Stock Crud API's End

  // Order Crud API's Start
  getOrderList() {
    return this.http.get<any>(this.baseUrl + '/order', this.getHeader());
  }

  getStoreOrderList(storeId) {
    return this.http.get<any>(this.baseUrl + '/order/store/' + storeId, this.getHeader());
  }

  getOrderDetail(id) {
    return this.http.get<any>(this.baseUrl + '/order/detail/' + id, this.getHeader());
  }
  // Order Crud API's End

  // Product Variations
  getProductVariations(id) {
    return this.http.get<any>(this.baseUrl + '/variation/product/' + id, this.getHeader());
  }

  addProductVariations(data) {
    return this.http.post<any>(this.baseUrl + '/variation', data, this.getHeader());
  }
  // Product Variations

  // Role Crud API's Start
  getRoleList() {
    return this.http.get<any>(this.baseUrl + '/role', this.getHeader());
  }

  addRole(data) {
    return this.http.post<any>(this.baseUrl + '/role', data, this.getHeader());
  }

  updateRole(data) {
    return this.http.put<any>(this.baseUrl + '/role', data, this.getHeader());
  }

  deleteRole(id) {
    return this.http.delete<any>(this.baseUrl + '/role/' + id, this.getHeader());
  }
  // Role Crud API's End

  // Employee Crud API's Start
  getEmployeeList() {
    return this.http.get<any>(this.baseUrl + '/employee', this.getHeader());
  }

  getStoreEmployeeList(storeId) {
    return this.http.get<any>(this.baseUrl + '/employee/store/' + storeId, this.getHeader());
  }

  addEmployee(data) {
    return this.http.post<any>(this.baseUrl + '/employee', data, this.getHeader());
  }

  updateEmployee(data) {
    return this.http.put<any>(this.baseUrl + '/employee', data, this.getHeader());
  }

  deleteEmployee(id) {
    return this.http.delete<any>(this.baseUrl + '/employee/' + id, this.getHeader());
  }
  // Employee Crud API's End

  // Store Crud API's Start
  getStoreList() {
    return this.http.get<any>(this.baseUrl + '/store', this.getHeader());
  }

  addStore(data) {
    return this.http.post<any>(this.baseUrl + '/store', data, this.getHeader());
  }

  getStore(id) {
    return this.http.get<any>(this.baseUrl + '/store/find/' + id, this.getHeader());
  }

  updateStore(data) {
    return this.http.put<any>(this.baseUrl + '/store', data, this.getHeader());
  }

  deleteStore(id) {
    return this.http.delete<any>(this.baseUrl + '/store/' + id, this.getHeader());
  }
  // Store Crud API's End

  // Store Config API's Start
  getStoreConfig(id) {
    return this.http.get<any>(this.baseUrl + '/store_config/find/' + id, this.getHeader());
  }

  getStoreConfigByStore(id) {
    return this.http.get<any>(this.baseUrl + '/store_config/store/' + id, this.getHeader());
  }

  addStoreConfig(data) {
    return this.http.post<any>(this.baseUrl + '/store_config', data, this.getHeader());
  }

  updateStoreConfig(data) {
    return this.http.put<any>(this.baseUrl + '/store_config', data, this.getHeader());
  }

  deleteStoreConfig(id) {
    return this.http.delete<any>(this.baseUrl + '/store_config/' + id, this.getHeader());
  }
  // Store Config API's End
}
