import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../services/students.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.css'
})
export class PaymentDetailsComponent implements OnInit {
  paymentId! : number;
  pdfFileUrl : any;

  constructor(private studentService : StudentsService, private route : ActivatedRoute){

  }
  
  //imp ngOnInit
  ngOnInit(): void {
    this.paymentId = this.route.snapshot.params['id'];
    this.studentService.getPaymentDetails(this.paymentId).subscribe({
      next : data => {
        let blob : Blob = new Blob([data], {type: 'application/pdf'});
        this.pdfFileUrl = window.URL.createObjectURL(blob);
      },
      error : err => {
        console.log(err);
      }
    });
  }

  //method afterLoadComplete($event)
  afterLoadComplete(event: any){

  }

}
