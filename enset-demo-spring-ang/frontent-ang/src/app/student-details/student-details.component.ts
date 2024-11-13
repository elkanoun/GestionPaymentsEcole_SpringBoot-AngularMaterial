import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../services/students.service';
import { Payment } from '../models/students.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css'
})
export class StudentDetailsComponent implements OnInit {
  studentCode! : string;
  paymentsStudent! : Array<Payment>;
  paymentsDatasource! : MatTableDataSource<Payment>;
  displayedColumns: string[] =["id","date","amount","type","status","firstName"]

  constructor(private activatedRoute:ActivatedRoute,
              private studentsSvc:StudentsService,
              private router:Router
  ){

  }

  ngOnInit(): void {
    this.studentCode = this.activatedRoute.snapshot.params['code'];
    this.studentsSvc.getPaymentsStudent(this.studentCode).subscribe({
      next : data => {
        this.paymentsStudent = data;
        this.paymentsDatasource = new MatTableDataSource<Payment>(this.paymentsStudent);
      },
      error : err => {
        console.log(err);
      }
    })
  }

  //method new payment
  newPayment(){
    this.router.navigateByUrl('/admin/new-payment/'+this.studentCode);  
  }

}
