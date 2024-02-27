import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor(private _HttpClient: HttpClient) {}

  //~+++++++++++++++++++++++++++++++++++++++++
  WishNumber: BehaviorSubject<number> = new BehaviorSubject(0);

  baseurl: string = 'https://ecommerce.routemisr.com';

  addToWishList(product_id: string): Observable<any> {
    return this._HttpClient.post(`${this.baseurl}/api/v1/wishlist`, {
      productId: product_id,
    });
  }

  getWishList(): Observable<any> {
    return this._HttpClient.get(`${this.baseurl}/api/v1/wishlist`);
  }

  removeFromWishList(id: string): Observable<any> {
    return this._HttpClient.delete(`${this.baseurl}/api/v1/wishlist/${id}`);
  }
}
