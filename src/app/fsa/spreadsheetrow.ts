import {IDayCell} from './daycell';

export interface ISpreadsheetRow {
    studentId: string;
    name: string;
    productCode: string;
    releaseDate: string;
    price: number;
    description: string;
    starRating: number;
    imageUrl: string;
    dayCells: IDayCell[]
}

export class SpreadsheetRow implements ISpreadsheetRow {
    studentId: string;
    name: string;
    productCode: string;
    releaseDate: string;
    price: number;
    description: string;
    starRating: number;
    imageUrl: string;
    dayCells: IDayCell[]
}