import { Component, OnInit } from '@angular/core';
import { IEChart, EChart, IDayList, DayList, ISpreadsheetRow, SpreadsheetRow, IDayCell, DayCell } from './echart';
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
        //this.echart=data;
            
        this.echart=new EChart();
        this.echart.rows;
        this.echart.dayList;
        console.log(this.echart.dayList.length);

        for (var x=1;x<=30;x++)
        {
            this.echart.dayList[x] = new DayList();
            this.echart.dayList[x].dayText = x + "";
        }
      

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