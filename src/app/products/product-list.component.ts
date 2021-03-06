import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import {ProductService} from './product.service';
@Component ({
    selector: "pm-products",
    templateUrl: "./product-list.component.html",
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
    constructor(private _productService: ProductService) {
        
    }

    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    listFilter: string = 'cart';
    errorMessage: string;
    products: IProduct;
    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    convertRawData(data: IProduct): void {
        this.products=data;
    }

    ngOnInit(): void {
        this._productService.getProducts()
            .subscribe(products=>this.convertRawData(products),
                error=>this.errorMessage=<any>error);

        
    }

    onNotify(message: string): void {
        this.pageTitle = message;
        console.log(message);

    }

}