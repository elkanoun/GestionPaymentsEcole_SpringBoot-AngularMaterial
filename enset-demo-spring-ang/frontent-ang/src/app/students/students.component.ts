import { AfterViewInit, Component, OnInit, ViewChild, input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { StudentsService } from '../services/students.service';
import { Student } from '../models/students.model';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit, AfterViewInit {
  //variables tr
  students! : Array<Student>;
  displayedColumns : string[] =['id','firstName','lastName','code','programId','payments']
  studentsDataSource : any;
  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort! : MatSort;
  
  constructor(private studentsSvc:StudentsService, private router:Router){
  }

  //data students statique(méthode exécutée à l'initialisation du composant)
  ngOnInit(): void {
    this.studentsSvc.getAllstudents().subscribe({
      next : data => {
        this.students = data;
        this.studentsDataSource = new MatTableDataSource(this.students);
      },
      error : err => {
        console.log(err);
      }
    })

  }

  //méthode exécutée aprés le chargement du composant
  ngAfterViewInit(): void {
    //pagination
    this.studentsDataSource.paginator = this.paginator;
    //tri
    this.studentsDataSource.sort = this.sort;
  }

  //imp méthode search students par mc
  filterData(event : Event){
    let value = (event.target as HTMLInputElement).value;
    this.studentsDataSource.filter = value;
  }
  
  //imp methode getPayements d'un student
  paymentsStudent(student:Student){
    this.router.navigateByUrl('/admin/student-details/'+student.code);
  }
  




}
