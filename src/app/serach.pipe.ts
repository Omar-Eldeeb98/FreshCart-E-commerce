import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './shared/interface/product';

@Pipe({
  name: 'search',
})
export class SerachPipe implements PipeTransform {
  transform(allProducts: Product[], userWord: string): any[] {
    return allProducts.filter((oneProd) =>
      oneProd.title.toLowerCase().includes(userWord.toLowerCase())
    );
  }
}
