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
    rows: ISpreadsheetRow[] = [];
    daylist: IDayList[] = [];
    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    convertRawData(data: IEChart): void {
        //this.echart=data;
         
        var dayList = new DayList();
        dayList.dayText = 31 + "";
        this.daylist.push(dayList);
        for (var x=1;x<=30;x++)
        {
            var dayList = new DayList();
            dayList.dayText = x + "";
            this.daylist.push(dayList);
        }

        
        var row = new SpreadsheetRow();
        row.studentId = "694984";
        row.name = "KARKMAN SJ";
        row.position = "FO";
        row.training = "TTD";
        row.base = "DFW";
        row.dayCells = [];

        for (var x=0;x<this.daylist.length;x++)
        {
            var dayCell = new DayCell();
            dayCell.cellSpan=1;
            dayCell.cellText = "Hello"
            dayCell.cellColor = "";
            dayCell.popupCaptionText = "popupCaptionText";
            dayCell.dayListIndex = x;
            dayCell.containsFlights = true;
            row.dayCells.push(dayCell);
        }

        this.rows.push(row);
        
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