import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/service/cart.service';
import { WishlistService } from './../../shared/service/wishlist.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { Product } from 'src/app/shared/interface/product';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  constructor(
    private _WishlistService: WishlistService,
    private _CartService: CartService,
    private _Renderer2: Renderer2,
    private _ToastrService: ToastrService
  ) {}
  products: any = null;

  //!=====================
  wishListData: string[] = [];
  //!=====================
  ngOnInit(): void {
    this._WishlistService.getWishList().subscribe({
      next: (response) => {
        // console.log(response); //& for test
        this.products = response.data;
        const newData = response.data.map((item: any) => item._id); //*  ["xyz" , "xyz" , "xyz"]
        this.wishListData = newData; //*  ["xyz" , "xyz" , "xyz"]

        if (response.data.length == 0) {
          this.products = null;
        }
      },
      error: (error) => {
        // console.log(error); //& for test
      },
    });
  }

  addProduct(id: string, element: HTMLButtonElement): void {
    this._Renderer2.setAttribute(element, 'disabled', 'true');

    this._CartService.addToCart(id).subscribe({
      next: (response) => {
        console.log(response); //& just for testing
        // console.log(response.message); //& just for testing
        this._ToastrService.success(response.message, '🛍️'); //^ added to cart Successfuly (toastr)
        this._Renderer2.removeAttribute(element, 'disabled');

        this._CartService.cartNumber.next(response.numOfCartItems);
      },
      error: (error) => {
        console.log(error); //& just for testing
        this._ToastrService.error(error); //^ erorr (toastr)
        this._Renderer2.removeAttribute(element, 'disabled');
      },
    });
  }

  addToWish(prod_id: string): void {
    this._WishlistService.addToWishList(prod_id).subscribe({
      next: (response) => {
        console.log(response.message); //& for test
        this._ToastrService.success(response.message, '❤️'); //^  (toastr show response.message )
        this.wishListData = response.data;
      },
      error: (error) => {
        console.log(error); //& for test
      },
    });
  }

  removeFromWish(id: string): void {
    this._WishlistService.removeFromWishList(id).subscribe({
      next: (response) => {
        console.log(response); //& for test
        this._ToastrService.info(response.message);
        this.wishListData = response.data;
        this._WishlistService.WishNumber.next(response.data.length);

        if (response.data.length == 0) {
          this.products = null;
        }

        this._WishlistService.getWishList().subscribe({
          next: (response) => {
            // console.log(response); //& for test
            this.products = response.data;

            if (response.data.length == 0) {
              this.products = null;
            }
          },
          error: (error) => {
            console.log(error); //& for test
          },
        });
      },
      error: (error) => {
        console.log(error); //& for test
      },
    });
  }
}
