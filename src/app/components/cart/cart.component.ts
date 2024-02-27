import { Component, OnInit, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _Renderer2: Renderer2
  ) {}
  cartDetails: any = null;

  ngOnInit(): void {
    // localStorage.setItem('currentPage', '/cart');

    this._CartService.getUserCart().subscribe({
      next: (response) => {
        console.log(response); //& just for testing
        this.cartDetails = response.data;
        if (response.numOfCartItems == 0) {
          this.cartDetails = null;
        }
      },
      error: (error) => {
        console.log(error); //& just for testing
      },
    });
  }

  removeItem(id: string, element: HTMLButtonElement) {
    this._Renderer2.setAttribute(element, 'disabled', 'true');
    this._CartService.deleteItemFromCart(id).subscribe({
      next: (response) => {
        if (response.status == 'success') {
          console.log(response); //& just for testing
          this.cartDetails = response.data;
          if (response.numOfCartItems == 0) {
            this.cartDetails = null;
          }

          this._ToastrService.info('Product Deleted Successfully'); //^ added to cart Successfuly (toastr)
          this._Renderer2.removeAttribute(element, 'disabled');

          this._CartService.cartNumber.next(response.numOfCartItems);
        }
      },
      error: (error) => {
        console.log(error); //& just for testing
        this._Renderer2.removeAttribute(element, 'disabled');
      },
    });
  }

  changePCount(
    count: number,
    prodId: string,
    element1: HTMLButtonElement,
    element2: HTMLButtonElement
  ): void {
    // console.log(count); //& just for testing
    if (count >= 1) {
      this._Renderer2.setAttribute(element1, 'disabled', 'true');
      this._Renderer2.setAttribute(element2, 'disabled', 'true');
      this._CartService.updateCartQuantity(prodId, count).subscribe({
        next: (response) => {
          console.log(response); //& just for testing
          this.cartDetails = response.data;
          this._Renderer2.removeAttribute(element1, 'disabled');
          this._Renderer2.removeAttribute(element2, 'disabled');
        },
        error: (error) => {
          console.log(error); //& just for testing
          this._Renderer2.removeAttribute(element1, 'disabled');
          this._Renderer2.removeAttribute(element2, 'disabled');
        },
      });
    }
  }

  clearCartProducts(): void {
    this._CartService.clearCart().subscribe({
      next: (response) => {
        console.log(response); //& just for testing
        if (response.message === 'success') {
          this.cartDetails = null;
          this._ToastrService.info('Cart Cleared Successfully');

          this._CartService.cartNumber.next(0);
        }
      },
      error: (error) => {
        console.log(error); //& just for testing
      },
    });
  }
}
