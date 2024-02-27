import { Router } from '@angular/router';
import { AccountDataInterface } from './../interface/account-data-interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    // if (localStorage.getItem('currentPage') != null) {
    //   this._Router.navigate([localStorage.getItem('currentPage')]);
    // }
  }

  baseUrl: string = 'https://ecommerce.routemisr.com';

  userDataVariable: BehaviorSubject<any> = new BehaviorSubject(null);

  setRegister(userData: AccountDataInterface): Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}/api/v1/auth/signup`,
      userData
    );
  }

  setLogin(userData: AccountDataInterface): Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}/api/v1/auth/signin`,
      userData
    );
  }

  //^  ================== (1) ==============
  forgetPasswordAPI(userData: AccountDataInterface): Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}/api/v1/auth/forgotPasswords`,
      userData
    );
  }

  //^  ================== (2) ==============
  verifyCodeAPI(userData: AccountDataInterface): Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}/api/v1/auth/verifyResetCode`,
      userData
    );
  }
  //^  ================== (3) ==============
  newPasswordAPI(userData: AccountDataInterface): Observable<any> {
    return this._HttpClient.put(
      `${this.baseUrl}/api/v1/auth/resetPassword`,
      userData
    );
  }

  saveUserDataMethod() {
    //* token ====> decode  ==== > accessed to all components
    if (localStorage.getItem('userToken') != null) {
      this.userDataVariable.next(localStorage.getItem('userToken'));
      this.userDataVariable.next(jwtDecode(this.userDataVariable.getValue()));
      // console.log(this.userDataVariable); //& just for testing  ,  output is an object {}
    } else {
      this.userDataVariable.next(null);
    }
  }
}
