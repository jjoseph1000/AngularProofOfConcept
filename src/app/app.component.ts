
import { Component } from '@angular/core';
import { ProductService } from './products/product.service';
import { FSAService } from './fsa/fsa.service';

@Component({
  selector: 'pm-root',
  template: `
    <div><h1></h1>
      <fsa-products></fsa-products>
    </div>
  `,
  providers: [ProductService,FSAService]
})



export class AppComponent {
  
  constructor(private _productService: ProductService, private _fsaService: FSAService) {  
  }


  pageTitle: string = 'Acme Product Management'
}