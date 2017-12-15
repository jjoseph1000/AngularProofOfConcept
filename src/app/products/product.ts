import {IProductItem} from './productitem';
import {IDayList} from './daylist';

export interface IProduct {
    testTitle: string
    daylist: IDayList[]
    productItem: IProductItem[]
}