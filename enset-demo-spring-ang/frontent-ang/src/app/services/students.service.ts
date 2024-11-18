import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Payment, Student } from '../models/students.model';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http: HttpClient) { 
  }

  //method get All Payments
  public getAllPayments():Observable<Array<Payment>>{
    return this.http.get<Array<Payment>>(environment.backendHost+"/payments");

  }

  //method get All students
  public getAllstudents():Observable<Array<Student>>{
    return this.http.get<Array<Student>>(environment.backendHost+"/students");

  }

  //method get payments of student
  public getPaymentsStudent(code : string):Observable<Array<Payment>>{
    return this.http.get<Array<Payment>>(environment.backendHost+"/students/"+code+"/payments");
  }

  //method save payment
  public savePayment(formData : any, headers : HttpHeaders):Observable<Payment>{
    return this.http.post<Payment>(environment.backendHost+"/payments", formData, { headers });
  }


}
