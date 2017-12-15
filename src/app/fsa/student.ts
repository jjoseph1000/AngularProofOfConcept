import {IDayCell} from './daycell';

export interface IStudent {
    productId: number;
    productName: string;
    productCode: string;
    releaseDate: string;
    price: number;
    description: string;
    starRating: number;
    imageUrl: string;
    dayCells: IDayCell[]
}