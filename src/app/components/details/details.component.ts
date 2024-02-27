import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/shared/service/products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/shared/service/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  productID: string = '';
  oneProduct: any = null; //* we will change data type to interface

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductsService: ProductsService,
    private _Renderer2: Renderer2,
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe((id) => {
      // console.log(id); //& for testing
      this.productID = id['productId'];
      this._ProductsService.getspecificProductApi(this.productID).subscribe({
        next: (p_Details) => {
          console.log(p_Details.data); //& for tsting
          this.oneProduct = p_Details.data;
        },
        error: (error) => {
          console.log(error);
        },
      });
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
}
