import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { CartService } from 'src/app/shared/service/cart.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css'],
})
export class AllordersComponent implements OnInit {
  constructor(private _CartService: CartService) {}
  storedToken: any = {};

  orders: any[] = [];

  ngOnInit(): void {
    if (localStorage.getItem('userToken') != null) {
      this.storedToken = localStorage.getItem('userToken');
      this.storedToken = jwtDecode(this.storedToken);
      // console.log(this.storedToken); //& for test
    }

    this._CartService.getOrders(this.storedToken.id).subscribe({
      next: (response) => {
        console.log(response); //& for test  output: [{},{},{},....]
        this.orders = response;
      },
      error: (error) => {
        console.log(error); //& for test
      },
    });
  }
}
