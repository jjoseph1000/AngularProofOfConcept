import { Component, OnInit } from '@angular/core';
import { IEChart, EChart } from './echart';
import { IDayList, DayList} from './daylist';
import { ISpreadsheetRow, SpreadsheetRow } from './spreadsheetrow';
import { IDayCell, DayCell } from './daycell';
import { FSAService } from './fsa.service';
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
    echart: IEChart = new EChart();
    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    convertRawData(data: IEChart): void {
        this.echart=data;
    }

    ngOnInit(): void {
        this._fsaService.getEChart()
            .subscribe(echart=>this.convertRawData(echart),
                error=>this.errorMessage=<any>error);

        
    }

    onNotify(message: string): void {
        this.pageTitle = message;
        console.log(message);

    }

}