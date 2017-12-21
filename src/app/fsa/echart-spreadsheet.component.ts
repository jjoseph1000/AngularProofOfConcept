import { Component, OnInit } from '@angular/core';
import { IFSAMonthlyDataset, IStudent, IEventDetail, IFlightInformation } from './fsamonthlydataset';
import { IDayList, DayList, ISpreadsheetRow, SpreadsheetRow, IDayCell, DayCell, IFlightDisplay, FlightDisplay } from './echart';
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

    convertRawData(data: IFSAMonthlyDataset): void {
       
        var startDate = new Date(data.startDate);  
        var endDate = new Date(data.endDate);
        var currentDate = new Date(data.startDate);  

        while (currentDate <= endDate)
        {
            var dayList = new DayList();
            dayList.dayText = currentDate.getDate() + "";
            dayList.day = new Date(currentDate);
            this.daylist.push(dayList);

            var dayOfMonth = currentDate.getDate();  
            currentDate.setDate(dayOfMonth + 1);       
        }
        
        for (let s of data.students)
        {
            var row = new SpreadsheetRow();
            row.studentId = s.studentId;
            row.name = s.name;
            row.position = s.position;
            row.training = s.training;
            row.base = s.base;
            
            for (var x = 0; x < this.daylist.length; x++) {
                var foundMatchingEvent = false;
                var d = new Date(this.daylist[x].day.getFullYear(), this.daylist[x].day.getMonth(), this.daylist[x].day.getDate())
                var dayCell = new DayCell();
                if (s.events != undefined)
                {
                    for (let e of s.events) {
                        var evStartDate = new Date(e.startDate);
                        var evStartDateOnly = new Date(evStartDate.getFullYear(), evStartDate.getMonth(), evStartDate.getDate());
        
                        var evEndDate = new Date(e.endDate);
                        var evEndDateOnly = new Date(evEndDate.getFullYear(), evEndDate.getMonth(), evEndDate.getDate())
        
                        if (foundMatchingEvent==false)
                        {
                            console.log(d + ' - ' + evStartDateOnly);
                            if (d.getTime()==evStartDateOnly.getTime())
                            {
                                foundMatchingEvent = true;
                                var diff = Math.abs(evStartDateOnly.getTime() - evEndDate.getTime());
                                var diffDays = Math.ceil(diff / (1000 * 3600 * 24)); 
                                var cellSpan = diffDays + 1;

                                dayCell.cellSpan = cellSpan;
                                dayCell.cellText = e.text;
                                dayCell.cellColor = e.eventColor;
                                dayCell.popupCaptionText = "";
                                row.dayCells.push(dayCell);    
            
                                x+=diffDays;
                            }    
                        }

        
                    }    
                }

                if (foundMatchingEvent==false)
                {
                    dayCell.cellSpan = 1;
                    dayCell.cellText = ""
                    dayCell.cellColor = "";
                    dayCell.popupCaptionText = "";
                    row.dayCells.push(dayCell);    
                }
            }    
                   
            this.rows.push(row);                         
        }


              
        this.loadFakeData();
        this.loadFakeData();
        this.loadFakeData();
        this.loadFakeData();
        this.loadFakeData();
        this.loadFakeData();
        
    }


    loadFakeData(): void {        
        var row = new SpreadsheetRow();
        row.studentId = "694984";
        row.name = "KARKMAN SJ";
        row.position = "FO";
        row.training = "TTD";
        row.base = "DFW";
        row.dayCells = [];

        var dayCell = new DayCell();
        dayCell.cellSpan=11;
        dayCell.cellText = ""
        dayCell.cellColor = "blueCell";
        dayCell.popupCaptionText = "";
        row.dayCells.push(dayCell);

        dayCell = new DayCell();
        dayCell.cellSpan=1;
        dayCell.cellText = "9167"
        dayCell.cellColor = "greyCell";
        dayCell.popupCaptionText = "";
        
        var flightInfo = new FlightDisplay();
        flightInfo.flt = "2437";
        flightInfo.departureStation = "DFW";
        flightInfo.departureTime = "7:10";
        flightInfo.arrivalStation = "ATL";
        flightInfo.arrivalTime = "10:19";
        flightInfo.ac_fly = "2.2";
        flightInfo.fleet = "38A";
        dayCell.flights.push(flightInfo);

        flightInfo = new FlightDisplay();
        flightInfo.flt = "2472";
        flightInfo.departureStation = "ATL";
        flightInfo.departureTime = "12:24";
        flightInfo.arrivalStation = "CLT";
        flightInfo.arrivalTime = "13:44";
        flightInfo.ac_fly = "1.3";
        flightInfo.fleet = "38A";
        dayCell.flights.push(flightInfo);

        flightInfo = new FlightDisplay();
        flightInfo.flt = "2255";
        flightInfo.departureStation = "CLT";
        flightInfo.departureTime = "14:59";
        flightInfo.arrivalStation = "ATL";
        flightInfo.arrivalTime = "16L15";
        flightInfo.ac_fly = "1.3";
        flightInfo.fleet = "38A";
        dayCell.flights.push(flightInfo);
        row.dayCells.push(dayCell);
       
        dayCell = new DayCell();
        dayCell.cellSpan=1;
        dayCell.cellText = "9167"
        dayCell.cellColor = "greyCell";
        dayCell.popupCaptionText = "";
        
        var flightInfo = new FlightDisplay();
        flightInfo.flt = "2437";
        flightInfo.departureStation = "DFW";
        flightInfo.departureTime = "7:10";
        flightInfo.arrivalStation = "ATL";
        flightInfo.arrivalTime = "10:19";
        flightInfo.ac_fly = "2.2";
        flightInfo.fleet = "38A";
        dayCell.flights.push(flightInfo);

        flightInfo = new FlightDisplay();
        flightInfo.flt = "2472";
        flightInfo.departureStation = "ATL";
        flightInfo.departureTime = "12:24";
        flightInfo.arrivalStation = "CLT";
        flightInfo.arrivalTime = "13:44";
        flightInfo.ac_fly = "1.3";
        flightInfo.fleet = "38A";
        dayCell.flights.push(flightInfo);

        flightInfo = new FlightDisplay();
        flightInfo.flt = "2255";
        flightInfo.departureStation = "CLT";
        flightInfo.departureTime = "14:59";
        flightInfo.arrivalStation = "ATL";
        flightInfo.arrivalTime = "16L15";
        flightInfo.ac_fly = "1.3";
        flightInfo.fleet = "38A";
        dayCell.flights.push(flightInfo);
        row.dayCells.push(dayCell);        dayCell = new DayCell();
        dayCell.cellSpan=1;
        dayCell.cellText = "9167"
        dayCell.cellColor = "greyCell";
        dayCell.popupCaptionText = "";
        
        var flightInfo = new FlightDisplay();
        flightInfo.flt = "2437";
        flightInfo.departureStation = "DFW";
        flightInfo.departureTime = "7:10";
        flightInfo.arrivalStation = "ATL";
        flightInfo.arrivalTime = "10:19";
        flightInfo.ac_fly = "2.2";
        flightInfo.fleet = "38A";
        dayCell.flights.push(flightInfo);

        flightInfo = new FlightDisplay();
        flightInfo.flt = "2472";
        flightInfo.departureStation = "ATL";
        flightInfo.departureTime = "12:24";
        flightInfo.arrivalStation = "CLT";
        flightInfo.arrivalTime = "13:44";
        flightInfo.ac_fly = "1.3";
        flightInfo.fleet = "38A";
        dayCell.flights.push(flightInfo);

        flightInfo = new FlightDisplay();
        flightInfo.flt = "2255";
        flightInfo.departureStation = "CLT";
        flightInfo.departureTime = "14:59";
        flightInfo.arrivalStation = "ATL";
        flightInfo.arrivalTime = "16L15";
        flightInfo.ac_fly = "1.3";
        flightInfo.fleet = "38A";
        dayCell.flights.push(flightInfo);
        row.dayCells.push(dayCell);

        for (var x=14;x<=30;x++)
        {
            dayCell = new DayCell();
            dayCell.cellSpan=1;
            dayCell.cellText = ""
            dayCell.cellColor = "";
            dayCell.popupCaptionText = "";
            row.dayCells.push(dayCell);
        }

        this.rows.push(row);

        row = new SpreadsheetRow();
        row.studentId = "-";
        row.name = "";
        row.position = "";
        row.training = "";
        row.base = "";
        row.dayCells = [];
        
        for (var x=1;x<=11;x++)
        {
            dayCell = new DayCell();
            dayCell.cellSpan=1;
            dayCell.cellText = ""
            dayCell.cellColor = "";
            dayCell.popupCaptionText = "";
            row.dayCells.push(dayCell);
        }

        dayCell = new DayCell();
        dayCell.cellSpan=1;
        dayCell.cellText = "TGA"
        dayCell.cellColor = "";
        dayCell.popupCaptionText = "DFW";
        row.dayCells.push(dayCell);

        dayCell = new DayCell();
        dayCell.cellSpan=1;
        dayCell.cellText = "TGA"
        dayCell.cellColor = "";
        dayCell.popupCaptionText = "DFW";
        row.dayCells.push(dayCell);

        dayCell = new DayCell();
        dayCell.cellSpan=1;
        dayCell.cellText = "TGA"
        dayCell.cellColor = "";
        dayCell.popupCaptionText = "DFW";
        row.dayCells.push(dayCell);

        for (var x=1;x<=17;x++)
        {
            dayCell = new DayCell();
            dayCell.cellSpan=1;
            dayCell.cellText = ""
            dayCell.cellColor = "";
            dayCell.popupCaptionText = "";
            row.dayCells.push(dayCell);
        }

        this.rows.push(row);

        row = new SpreadsheetRow();
        row.studentId = "-";
        row.name = "";
        row.position = "";
        row.training = "";
        row.base = "";
        row.dayCells = [];
        
        for (var x=1;x<=36;x++)
        {
            dayCell = new DayCell();
            dayCell.cellSpan=1;
            dayCell.cellText = ""
            dayCell.cellColor = "";
            dayCell.popupCaptionText = "";
            row.dayCells.push(dayCell);
        }
        this.rows.push(row);

        row = new SpreadsheetRow();
        row.studentId = "-";
        row.name = "";
        row.position = "";
        row.training = "";
        row.base = "";
        row.dayCells = [];
        
        for (var x=1;x<=36;x++)
        {
            dayCell = new DayCell();
            dayCell.cellSpan=1;
            dayCell.cellText = ""
            dayCell.cellColor = "";
            dayCell.popupCaptionText = "";
            row.dayCells.push(dayCell);
        }
        this.rows.push(row);

///////////////////////////
        var row = new SpreadsheetRow();
        row.studentId = "694984";
        row.name = "KARKMAN SJ";
        row.position = "FO";
        row.training = "TTD";
        row.base = "DFW";
        row.dayCells = [];

        var dayCell = new DayCell();
        dayCell.cellSpan=13;
        dayCell.cellText = ""
        dayCell.cellColor = "blueCell";
        dayCell.popupCaptionText = "";
        row.dayCells.push(dayCell);

        for (var x=1;x<=2;x++)
        {
            dayCell = new DayCell();
            dayCell.cellSpan=1;
            dayCell.cellText = "DV"
            dayCell.cellColor = "greenCell";
            dayCell.popupCaptionText = "";
            row.dayCells.push(dayCell);
        }

        for (var x=1;x<=2;x++)
        {
            dayCell = new DayCell();
            dayCell.cellSpan=1;
            dayCell.cellText = ""
            dayCell.cellColor = "";
            dayCell.popupCaptionText = "";
            row.dayCells.push(dayCell);
        }

        dayCell = new DayCell();
        dayCell.cellSpan=1;
        dayCell.cellText = "DHD"
        dayCell.cellColor = "orangeCell";
        dayCell.popupCaptionText = "";
        row.dayCells.push(dayCell);

        dayCell = new DayCell();
        dayCell.cellSpan=1;
        dayCell.cellText = "9167"
        dayCell.cellColor = "greyCell";
        dayCell.popupCaptionText = "";

        var flightInfo = new FlightDisplay();
        flightInfo.flt = "2437";
        flightInfo.departureStation = "DFW";
        flightInfo.departureTime = "7:10";
        flightInfo.arrivalStation = "ATL";
        flightInfo.arrivalTime = "10:19";
        flightInfo.ac_fly = "2.2";
        flightInfo.fleet = "38A";
        dayCell.flights.push(flightInfo);

        flightInfo = new FlightDisplay();
        flightInfo.flt = "2472";
        flightInfo.departureStation = "ATL";
        flightInfo.departureTime = "12:24";
        flightInfo.arrivalStation = "CLT";
        flightInfo.arrivalTime = "13:44";
        flightInfo.ac_fly = "1.3";
        flightInfo.fleet = "38A";
        dayCell.flights.push(flightInfo);

        flightInfo = new FlightDisplay();
        flightInfo.flt = "2255";
        flightInfo.departureStation = "CLT";
        flightInfo.departureTime = "14:59";
        flightInfo.arrivalStation = "ATL";
        flightInfo.arrivalTime = "16L15";
        flightInfo.ac_fly = "1.3";
        flightInfo.fleet = "38A";
        dayCell.flights.push(flightInfo);
        row.dayCells.push(dayCell);

        dayCell = new DayCell();
        dayCell.cellSpan=1;
        dayCell.cellText = "9167"
        dayCell.cellColor = "greyCell";
        dayCell.popupCaptionText = "";

        var flightInfo = new FlightDisplay();
        flightInfo.flt = "2437";
        flightInfo.departureStation = "DFW";
        flightInfo.departureTime = "7:10";
        flightInfo.arrivalStation = "ATL";
        flightInfo.arrivalTime = "10:19";
        flightInfo.ac_fly = "2.2";
        flightInfo.fleet = "38A";
        dayCell.flights.push(flightInfo);

        flightInfo = new FlightDisplay();
        flightInfo.flt = "2472";
        flightInfo.departureStation = "ATL";
        flightInfo.departureTime = "12:24";
        flightInfo.arrivalStation = "CLT";
        flightInfo.arrivalTime = "13:44";
        flightInfo.ac_fly = "1.3";
        flightInfo.fleet = "38A";
        dayCell.flights.push(flightInfo);

        flightInfo = new FlightDisplay();
        flightInfo.flt = "2255";
        flightInfo.departureStation = "CLT";
        flightInfo.departureTime = "14:59";
        flightInfo.arrivalStation = "ATL";
        flightInfo.arrivalTime = "16L15";
        flightInfo.ac_fly = "1.3";
        flightInfo.fleet = "38A";
        dayCell.flights.push(flightInfo);
        row.dayCells.push(dayCell);        
        dayCell = new DayCell();
        dayCell.cellSpan=1;
        dayCell.cellText = "9167"
        dayCell.cellColor = "greyCell";
        dayCell.popupCaptionText = "";

        var flightInfo = new FlightDisplay();
        flightInfo.flt = "2437";
        flightInfo.departureStation = "DFW";
        flightInfo.departureTime = "7:10";
        flightInfo.arrivalStation = "ATL";
        flightInfo.arrivalTime = "10:19";
        flightInfo.ac_fly = "2.2";
        flightInfo.fleet = "38A";
        dayCell.flights.push(flightInfo);

        flightInfo = new FlightDisplay();
        flightInfo.flt = "2472";
        flightInfo.departureStation = "ATL";
        flightInfo.departureTime = "12:24";
        flightInfo.arrivalStation = "CLT";
        flightInfo.arrivalTime = "13:44";
        flightInfo.ac_fly = "1.3";
        flightInfo.fleet = "38A";
        dayCell.flights.push(flightInfo);

        flightInfo = new FlightDisplay();
        flightInfo.flt = "2255";
        flightInfo.departureStation = "CLT";
        flightInfo.departureTime = "14:59";
        flightInfo.arrivalStation = "ATL";
        flightInfo.arrivalTime = "16L15";
        flightInfo.ac_fly = "1.3";
        flightInfo.fleet = "38A";
        dayCell.flights.push(flightInfo);
        row.dayCells.push(dayCell);

        for (var x=14;x<=23;x++)
        {
            dayCell = new DayCell();
            dayCell.cellSpan=1;
            dayCell.cellText = ""
            dayCell.cellColor = "";
            dayCell.popupCaptionText = "";
            row.dayCells.push(dayCell);
        }

        this.rows.push(row);
//////////////////Row Two
        row = new SpreadsheetRow();
        row.studentId = "-";
        row.name = "";
        row.position = "";
        row.training = "";
        row.base = "";
        row.dayCells = [];

        for (var x=1;x<=11;x++)
        {
            dayCell = new DayCell();
            dayCell.cellSpan=1;
            dayCell.cellText = ""
            dayCell.cellColor = "";
            dayCell.popupCaptionText = "";
            row.dayCells.push(dayCell);
        }

        dayCell = new DayCell();
        dayCell.cellSpan=1;
        dayCell.cellText = "TGA"
        dayCell.cellColor = "";
        dayCell.popupCaptionText = "DFW";
        row.dayCells.push(dayCell);

        dayCell = new DayCell();
        dayCell.cellSpan=1;
        dayCell.cellText = "TGA"
        dayCell.cellColor = "";
        dayCell.popupCaptionText = "DFW";
        row.dayCells.push(dayCell);

        dayCell = new DayCell();
        dayCell.cellSpan=1;
        dayCell.cellText = "TGA"
        dayCell.cellColor = "";
        dayCell.popupCaptionText = "DFW";
        row.dayCells.push(dayCell);

        for (var x=1;x<=17;x++)
        {
            dayCell = new DayCell();
            dayCell.cellSpan=1;
            dayCell.cellText = ""
            dayCell.cellColor = "";
            dayCell.popupCaptionText = "";
            row.dayCells.push(dayCell);
        }

        this.rows.push(row);
//////////////////Row Three
        row = new SpreadsheetRow();
        row.studentId = "-";
        row.name = "";
        row.position = "";
        row.training = "";
        row.base = "";
        row.dayCells = [];

        for (var x=1;x<=36;x++)
        {
            dayCell = new DayCell();
            dayCell.cellSpan=1;
            dayCell.cellText = ""
            dayCell.cellColor = "";
            dayCell.popupCaptionText = "";
            row.dayCells.push(dayCell);
        }
        this.rows.push(row);

        //////////////////Row Four
        row = new SpreadsheetRow();
        row.studentId = "-";
        row.name = "";
        row.position = "";
        row.training = "";
        row.base = "";
        row.dayCells = [];

        for (var x=1;x<=36;x++)
        {
            dayCell = new DayCell();
            dayCell.cellSpan=1;
            dayCell.cellText = ""
            dayCell.cellColor = "";
            dayCell.popupCaptionText = "";
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