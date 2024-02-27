import { WishlistService } from './../../shared/service/wishlist.service';
import { Category } from './../../shared/interface/category';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { ProductsService } from 'src/app/shared/service/products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Product } from 'src/app/shared/interface/product';
import { CartService } from 'src/app/shared/service/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _Renderer2: Renderer2,
    private _WishlistService: WishlistService
  ) {}
  products: Product[] = [];
  categories: Category[] = [];

  //!=====================
  wishListData: string[] = [];
  //!=====================

  //^============ PIPE============
  inputValue: string = '';
  //^============ PIPE============
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplaySpeed: 1000,
    navSpeed: 700,
    margin: 10,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: true,
  };
  customOptions_2: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplaySpeed: 1000,
    navSpeed: 700,
    margin: 10,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      980: {
        items: 6,
      },
    },
    nav: true,
  };

  ngOnInit(): void {
    // localStorage.setItem('currentPage', '/home');
    this._ProductsService.getProductsApi().subscribe({
      next: (products) => {
        console.log(products.data); //& for testing
        this.products = products.data;
      },
      error: (error) => {
        console.log(error); //& for testing
      },
    });

    this._ProductsService.getCategoriesApi().subscribe({
      next: (data) => {
        console.log(data.data); //& just for testing
        this.categories = data.data; //^=============================   = ==== = = = =  = = =  =  = = =
      },
      error: (error) => {
        console.log(error); //& just for testing
      },
    });

    //!===========================================================
    this._WishlistService.getWishList().subscribe({
      next: (response) => {
        // console.log(response.data); //& for test output = [{},{},{}, ...]

        const newData = response.data.map((item: any) => item._id); //*  ["xyz" , "xyz" , "xyz"]
        this.wishListData = newData; //*  ["xyz" , "xyz" , "xyz"]
      },
      error: (error) => {
        console.log(error); //& for test
      },
    });
    //!===========================================================
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

        this._WishlistService.WishNumber.next(response.data.length);
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
      },
      error: (error) => {
        console.log(error); //& for test
      },
    });
  }
}
