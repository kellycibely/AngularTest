import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../shared/product/product.service';
import { GiphyService } from '../shared/giphy/giphy.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit, OnDestroy {
  product: any = {};

  sub: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService,
              private giphyService: GiphyService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.productService.get(id).subscribe((product: any) => {
          if (product) {
            this.product = product;
            this.product.href = product._links.self.href;
            this.giphyService.get(product.name).subscribe(url => product.giphyUrl = url);
          } else {
            console.log(`Product with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/product-list']);
  }

  save(form: NgForm) {
    this.productService.save(form).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

  remove(href) {
    this.productService.remove(href).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }
}