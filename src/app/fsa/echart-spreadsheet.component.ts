import { Component, OnInit } from '@angular/core';
import { IFSAMonthlyDataset, IStudent, IEventData, IFlightInformation } from './fsamonthlydataset';
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
        /*
        Each Student will generate 4 rows on the spreadsheet.  The first row will contian the
        bulk of the information.  The second row will contain the secondary information associated with
        flight details.  The last two rows will be blank.
        */
        for (let s of data.students)
        {
            //First Row
            this.loadStudentContent(startDate,endDate,s,false);
            
            //Second Row
            this.loadStudentContent(startDate,endDate,s,true);
            
            //Third & Forth Row which are blank
            for (var r=1;r<=2;r++)
            {
                var row = new SpreadsheetRow();
                row.studentId = "-";
                row.name = "";
                row.position = "";
                row.training = "";
                row.base = "";
                row.dayCells = [];
                
                for (var x=1;x<=this.daylist.length;x++)
                {
                    var dayCell = new DayCell();
                    dayCell.cellSpan=1;
                    dayCell.cellText = ""
                    dayCell.cellColor = "";
                    dayCell.popupCaptionText = "";
                    row.dayCells.push(dayCell);
                }
                this.rows.push(row);
            }
        }


             
        this.loadFakeData();
        this.loadFakeData();
        this.loadFakeData();
        this.loadFakeData();
        this.loadFakeData();
        this.loadFakeData();
        
    }

    loadStudentContent(startDate: Date, endDate: Date, s: IStudent, isSecondRow: boolean): void {
        var row = new SpreadsheetRow();
        row.studentId = (isSecondRow)?"-":s.studentId;
        row.name = (isSecondRow)?"":s.name;
        row.position = (isSecondRow)?"":s.position;
        row.training = (isSecondRow)?"":s.training;
        row.base = (isSecondRow)?"":s.base;
        
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
                        if (isSecondRow==false || (isSecondRow && e.flights != undefined && e.flights.length > 0))
                        {
                            var compEventStartDate = new Date();
                            var compEventEndDate = new Date();

                            if ((x==0&&evStartDateOnly.getTime()<startDate.getTime()
                                    &&startDate.getTime()<=evEndDateOnly.getTime()
                                    &&evEndDateOnly.getTime()<=endDate.getTime()
                                ) 
                                || (d.getTime()==evStartDateOnly.getTime())                                
                            )
                            {
                                if (d.getTime()==evStartDateOnly.getTime())
                                {
                                    compEventStartDate = new Date(evStartDateOnly);

                                    if (endDate.getTime() < evEndDateOnly.getTime())
                                    {
                                        compEventEndDate = new Date(endDate);
                                    }
                                    else
                                    {
                                        compEventEndDate = new Date(evEndDateOnly);
                                    }
                                }
                                else if ((x==0&&evStartDateOnly.getTime()<startDate.getTime()
                                    &&startDate.getTime()<=evEndDateOnly.getTime()
                                    &&evEndDateOnly.getTime()<=endDate.getTime()
                                ))
                                {
                                    compEventStartDate = new Date(startDate);
                                    compEventEndDate = new Date(evEndDateOnly);
                                }

                                foundMatchingEvent = true;
                                var diff = Math.abs(compEventStartDate.getTime() - compEventEndDate.getTime());
                                var diffDays = Math.ceil(diff / (1000 * 3600 * 24)); 
                                var diffDaysFinal = (x==0)?((diffDays==0)?0:diffDays-1):diffDays;
                                var cellSpan = diffDaysFinal+1;

                                dayCell.cellSpan = cellSpan;

                                if (isSecondRow)
                                {
                                    dayCell.cellText = e.secondRowText;
                                    dayCell.popupCaptionText = e.secondRowPopup;
                                }
                                else
                                {
                                    dayCell.cellText = e.text;

                                    if (e.flights != undefined && e.flights.length > 0)
                                    {
                                        for (let f of e.flights)
                                        {
                                            var flightInfo = new FlightDisplay();
                                            flightInfo.flt = f.flt;
                                            flightInfo.departureStation = f.departureStation;
                                            flightInfo.departureTime = f.departureTime;
                                            flightInfo.arrivalStation = f.arrivalStation;
                                            flightInfo.arrivalTime = f.arrivalTime;
                                            flightInfo.ac_fly = f.ac_fly;
                                            flightInfo.fleet = f.fleet;
                                            dayCell.flights.push(flightInfo);                                
                                        }
                                        dayCell.cellColor = "greyCell";
                                    }
                                    else
                                    {
                                        switch (e.eventColor)
                                        {
                                            case "orange":
                                                dayCell.cellColor = "orangeCell";
                                                break;
                                            case "blue":
                                                dayCell.cellColor = "blueCell";
                                                break;
                                            case "green":
                                                dayCell.cellColor = "greenCell";
                                                break;         
                                        }
                                    }
                                }

                                row.dayCells.push(dayCell);    
            
                                x+=diffDaysFinal;

                            }  
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