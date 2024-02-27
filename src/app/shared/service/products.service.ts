import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private _HttpClient: HttpClient) {}
  baseUrl: string = 'https://ecommerce.routemisr.com';

  getProductsApi(pageNumber: number = 1): Observable<any> {
    return this._HttpClient.get(
      `${this.baseUrl}/api/v1/products?page=${pageNumber}`
    );
  }

  getspecificProductApi(id: string): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/products/${id}`);
  }

  getCategoriesApi(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/categories`);
  }

  getAllSubCategories(catId: string): Observable<any> {
    return this._HttpClient.get(
      `${this.baseUrl}/api/v1/categories/${catId}/subcategories`
    );
  }

  getAllBrands(pageNumber: number = 1): Observable<any> {
    return this._HttpClient.get(
      `${this.baseUrl}/api/v1/brands?page=${pageNumber}`
    );
  }

  getSpecificBrand(product_id: string): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/brands/${product_id}`);
  }
}
