import {IStudent} from './student';
import {IDayList} from './daylist';

export interface IEChart {
    testTitle: string
    daylist: IDayList[]
    students: IStudent[]
}