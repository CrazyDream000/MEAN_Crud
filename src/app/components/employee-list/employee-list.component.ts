import { Component, OnInit, NgZone } from '@angular/core';
import { ApiService } from './../../service/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  
  Employee:any = [];
  constructor(private apiService: ApiService,
    private ngZone: NgZone,
    private router: Router,) { 
    
    this.readEmployee();
  }
  ngOnInit() {}
  readEmployee(){
    this.apiService.getEmployees().subscribe((data) => {
     this.Employee = data;
    })    
  }
  removeEmployee(employee, index) {
    if(window.confirm('Are you sure?')) {
      this.apiService.deleteEmployee(employee._id).subscribe({
        complete: () => {
        this.Employee.splice(index, 1);
        this.ngZone.run(() => this.router.navigateByUrl('/employees-list'));
        }
      })    
    }
  }
}