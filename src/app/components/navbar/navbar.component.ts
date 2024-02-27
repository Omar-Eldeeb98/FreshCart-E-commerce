import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CartService } from 'src/app/shared/service/cart.service';
import { WishlistService } from 'src/app/shared/service/wishlist.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _CartService: CartService,
    private _Renderer2: Renderer2,
    private _WishlistService: WishlistService
  ) {}
  isLogin: boolean = false;
  cartNum: number = 0;
  wishNum: number = 0;

  @ViewChild('navbar') navElement!: ElementRef; //^ (1) element

  @HostListener('window:scroll') //^ (2) method
  onScroll(): void {
    // console.log('hello scroll '); //& for test
    if (scrollY > 500) {
      this._Renderer2.addClass(this.navElement.nativeElement, 'px-5');
      this._Renderer2.addClass(this.navElement.nativeElement, 'shadow');
    } else {
      this._Renderer2.removeClass(this.navElement.nativeElement, 'px-5');
      this._Renderer2.removeClass(this.navElement.nativeElement, 'shadow');
    }
  }

  ngOnInit(): void {
    this._AuthService.userDataVariable.subscribe(() => {
      if (this._AuthService.userDataVariable.getValue() == null) {
        this.isLogin = false;
      } else {
        this.isLogin = true;
      }
    });
    //~----------------------------------------------------------
    this._CartService.cartNumber.subscribe({
      next: (data) => {
        // console.log('nav', data); //& just for test
        this.cartNum = data;
      },
    });

    this._WishlistService.WishNumber.subscribe({
      next: (data) => {
        this.wishNum = data;
      },
    });

    this._CartService.getUserCart().subscribe({
      next: (response) => {
        // console.log(response.numOfCartItems); //& for test
        this.cartNum = response.numOfCartItems;
      },
    });

    this._WishlistService.getWishList().subscribe({
      next: (response) => {
        console.log('for test', response); //& for test

        this.wishNum = response.count;
      },
    });
  }

  //^ function make user logout =================
  logout(): void {
    //? steps ...
    //! (1) remove user token from localstorage
    localStorage.removeItem('userToken');
    //! (2) make userDataVariable = null
    this._AuthService.saveUserDataMethod();
    //! (3) programming routing to login page  <login component>
    this._Router.navigate(['/login']);
  }
}
