import { jwtDecode } from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _HttpClient: HttpClient) {}

  cartNumber: BehaviorSubject<number> = new BehaviorSubject(0);

  // myToken: any = {
  //   token: localStorage.getItem('userToken'),
  // };
  baseurl: string = 'https://ecommerce.routemisr.com';

  storedToken: any = {};

  addToCart(prodId: string): Observable<any> {
    return this._HttpClient.post(
      `${this.baseurl}/api/v1/cart`,
      {
        productId: prodId,
      }
      // {
      //   headers: this.myToken,
      // }
    );
  }

  getUserCart(): Observable<any> {
    return this._HttpClient.get(
      `${this.baseurl}/api/v1/cart`
      //  {
      //   headers: this.myToken,
      // }
    );
  }

  deleteItemFromCart(prodId: string): Observable<any> {
    return this._HttpClient.delete(
      `${this.baseurl}/api/v1/cart/${prodId}`
      // {
      //   headers: this.myToken,
      // }
    );
  }

  updateCartQuantity(p_id: string, countNumber: number): Observable<any> {
    return this._HttpClient.put(
      `${this.baseurl}/api/v1/cart/${p_id}`,
      {
        count: countNumber,
      }
      // {
      //   headers: this.myToken,
      // }
    );
  }

  clearCart(): Observable<any> {
    return this._HttpClient.delete(
      `${this.baseurl}/api/v1/cart`
      // {
      //   headers: this.myToken,
      // }
    );
  }

  checkOut(cartId: string, orderInfo: object): Observable<any> {
    return this._HttpClient.post(
      `${this.baseurl}/api/v1/orders/checkout-session/${cartId}?url=https://omar-eldeeb98.github.io/FreshCart-E-commerce/`,
      {
        shippingAddress: orderInfo,
      }
      // {
      //   headers: this.myToken,
      // }
    );
  }

  getOrders(userId: string): Observable<any> {
    return this._HttpClient.get(`${this.baseurl}/api/v1/orders/user/${userId}`);
  }
}
