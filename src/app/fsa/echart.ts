
export interface IDayList {
    dayText: string
    day: Date
}

export class DayList implements IDayList {
    dayText: string = "";
    day: Date
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
    dayListIndex: number
    flights: IFlightDisplay[]
}

export class DayCell implements IDayCell {
    cellText: string;
    cellSpan: number;
    cellColor: string;
    popupCaptionText: string; 
    dayListIndex: number;
    flights: IFlightDisplay[] = [];
}

export interface IFlightDisplay {
    flt: string
    departureStation: string
    departureTime: string
    arrivalStation: string
    arrivalTime: string
    ac_fly: string
    fleet: string
}

export class FlightDisplay implements IFlightDisplay {
    flt: string
    departureStation: string
    departureTime: string
    arrivalStation: string
    arrivalTime: string
    ac_fly: string
    fleet: string
}