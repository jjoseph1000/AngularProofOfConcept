
import { Component } from '@angular/core';
import {ProductService } from './products/product.service';

@Component({
  selector: 'pm-root',
  template: `
    <div><h1>{{pageTitle}}</h1>
      <pm-products></pm-products>
    </div>
  `,
  providers: [ProductService]
})



export class AppComponent {
  
  constructor(private _productService: ProductService) {  
  }


  pageTitle: string = 'Acme Product Management'
}