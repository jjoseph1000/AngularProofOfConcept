
export interface IEChart {
    testTitle: string
    dayList: DayList[]
    rows: SpreadsheetRow[]
}

export class EChart implements IEChart {
    testTitle: string;
    dayList: DayList[] = [{"dayText": ""}];
    rows: SpreadsheetRow[] = [{"studentId":"","name":"","position":"","training":"","base":"","dayCells": []}];
}

export interface IDayList {
    dayText: string
}

export class DayList implements IDayList {
    dayText: string = "";
}

export interface ISpreadsheetRow {
    studentId: string;
    name: string;
    position: string;
    training: string;
    base: string;
    dayCells: IDayCell[];
}

export class SpreadsheetRow implements ISpreadsheetRow {
    studentId: string;
    name: string;
    position: string;
    training: string;
    base: string;
    dayCells: IDayCell[] = [];
}

export interface IDayCell {
    cellText: string
    cellSpan: number
    cellColor: string
    popupCaptionText: string 
    containsFlights: boolean   
    flights: IFlightInformation[]
}

export class DayCell implements IDayCell {
    cellText: string;
    cellSpan: number;
    cellColor: string;
    popupCaptionText: string; 
    containsFlights: boolean;   
    flights: IFlightInformation[] = [];
}

export interface IFlightInformation {
    flt: string
    departureStation: string
    departureTime: string
    arrivalStation: string
    arrivalTime: string
    ac_fly: string
    fleet: string
}

export class FlightInformation implements IFlightInformation {
    flt: string
    departureStation: string
    departureTime: string
    arrivalStation: string
    arrivalTime: string
    ac_fly: string
    fleet: string
}