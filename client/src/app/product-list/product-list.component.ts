import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product/product.service';
import { GiphyService } from '../shared/giphy/giphy.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Array<any>;

  constructor(private productService: ProductService, private giphyService: GiphyService) { }

  ngOnInit() {
    this.productService.getAll().subscribe(data => {
      this.products = data;
      for (const product of this.products) {
        this.giphyService.get(product.name).subscribe(url => product.giphyUrl = url);
      }
    });
  }
}
