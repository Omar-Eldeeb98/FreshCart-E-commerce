import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/service/products.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'],
})
export class BrandsComponent implements OnInit {
  constructor(private _ProductsService: ProductsService) {}

  brands: any[] = [];

  pageSize: number = 0;
  currentPage: number = 1;
  total: number = 0;
  specificBrand: any = {};

  ngOnInit(): void {
    // localStorage.setItem('currentPage', '/brands');

    this._ProductsService.getAllBrands().subscribe({
      next: (response) => {
        console.log(response); //& for test
        this.brands = response.data;

        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.total = response.results;
      },
      error: (error) => {
        console.log(error); //& for test
      },
    });
  }

  pageChanged(event: any): void {
    this._ProductsService.getAllBrands(event).subscribe({
      next: (response) => {
        console.log(response); //& for test
        this.brands = response.data;

        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.total = response.results;
      },
      error: (error) => {
        console.log(error); //& for test
      },
    });
  }

  getABrand(id: string): void {
    this._ProductsService.getSpecificBrand(id).subscribe({
      next: (response) => {
        console.log(response); //& for test
        this.specificBrand = response.data;
        // console.log(this.specificBrand);
      },
      error: (error) => {
        console.log(error); //& for testing
      },
    });
  }
}
