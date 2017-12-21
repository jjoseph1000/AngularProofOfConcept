
export interface IFSAMonthlyDataset {
    startDate: Date
    endDate: Date
    students: IStudent[]
}


export interface IStudent {
    studentId: string;
    name: string;
    position: string;
    training: string;
    base: string;
    events: IEventDetail[]
}

export interface IEventDetail {
    startDate: Date
    endDate: Date
    eventColor: string
    text: string
    secondRowText: string
    flights: IFlightInformation[]
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


