import {ISpreadsheetRow, SpreadsheetRow} from './spreadsheetrow';
import {IDayList} from './daylist';

export interface IEChart {
    testTitle: string
    dayList: IDayList[]
    rows: ISpreadsheetRow[]
}

export class EChart implements IEChart {
    testTitle: string
    dayList: IDayList[]
    rows: ISpreadsheetRow[];
}