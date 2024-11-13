export interface Student{
    id : string,
    code : string,
    firstName : string,
    lastName : string,
    programId : string,
    photo : string
}


export interface Payment{
    id : number,
    date : string,
    amount : number,
    type : string,
    status : string,
    file : string,
    student : Student
}


export enum PaymentType{
    CASH=0, CHECK=1, TRANSFER=2, DEPOSIT=3
}

export enum PaymentStatus{
    CREATED=0, VALIDATED=1, REJECTED=3
}