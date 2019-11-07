import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ProductService {
  public API = '//localhost:8080';
  public PRODUCT_API = this.API + '/products';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(this.API + '/cool-products');
  }

  get(id: string) {
    return this.http.get(this.PRODUCT_API + '/' + id);
  }

  save(product: any): Observable<any> {
    let result: Observable<Object>;
    if (product['href']) {
      result = this.http.put(product.href, product);
    } else {
      result = this.http.post(this.PRODUCT_API, product);
    }
    return result;
  }

  remove(href: string) {
    return this.http.delete(href);
  }
}


