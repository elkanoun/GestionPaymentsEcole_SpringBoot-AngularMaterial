import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentType } from '../models/students.model';
import { StudentsService } from '../services/students.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrl: './new-payment.component.css'
})
export class NewPaymentComponent implements OnInit {
  paymentFormGroup! : FormGroup;
  studentCode! : string;
  paymentTypes : string[]=[];
  pdfFileUrl! : string;
  showProgress : boolean = false;

  constructor(private fb : FormBuilder, 
              private activatedRoute : ActivatedRoute,
              private studentService : StudentsService){

  }

  ngOnInit(): void {
    for(let element in PaymentType){
      let value = PaymentType[element];
      if(typeof value === 'string'){
        this.paymentTypes.push(value);
      }
    }
    this.studentCode = this.activatedRoute.snapshot.params['studentCode'];
    this.paymentFormGroup = this.fb.group({
      date : this.fb.control(''),
      amount : this.fb.control(''),
      type : this.fb.control(''),
      studentCode : this.fb.control(this.studentCode),
      fileSource : this.fb.control(''),
      fileName : this.fb.control('')
    });
  }

  //method selectFile($event)
  selectFile(event:any){
    if(event.target.files.length>0){
      let file : File = event.target.files[0];
      this.paymentFormGroup.patchValue({
        fileSource : file,
        fileName : file.name
      });
      this.pdfFileUrl = window.URL.createObjectURL(file);
    }
  }

  //method savePayment()
  savePayment(){
    this.showProgress = true;
    let date : Date = new Date(this.paymentFormGroup.value.date);
    let formattedDate = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();

    let formData : FormData = new FormData();
    formData.set('date', formattedDate);
    formData.set('amount', this.paymentFormGroup.value.amount);
    formData.set('type', this.paymentFormGroup.value.type);
    formData.set('studentCode', this.paymentFormGroup.value.studentCode);
    formData.append('file', this.paymentFormGroup.value.fileSource);

    const headers : HttpHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    });
    
    this.studentService.savePayment(formData, headers).subscribe({
      next : value => {
        this.showProgress = false;
        alert('Payment saved successfully!');
      },
      error : err => {
        console.log(err);
      }
    });
  }

  //method afterLoadComplete
  afterLoadComplete(event:any){
    console.log(event);
  }

}
