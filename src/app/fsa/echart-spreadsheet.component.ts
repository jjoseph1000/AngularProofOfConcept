import { Component, OnInit } from '@angular/core';
import { IEChart } from './echart';
import {FSAService} from './fsa.service';
@Component ({
    selector: "fsa-products",
    templateUrl: "./echart-spreadsheet.component.html",
    styleUrls: ['./echart-spreadsheet.component.css']
})

export class EChartSpreadsheetComponent implements OnInit {
    constructor(private _fsaService: FSAService) {
        
    }

    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    listFilter: string = 'cart';
    errorMessage: string;
    echart: IEChart;
    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        this._fsaService.getEChart()
            .subscribe(echart=>this.echart=echart,
                error=>this.errorMessage=<any>error);

        
    }

    onNotify(message: string): void {
        this.pageTitle = message;
        console.log(message);

    }

}