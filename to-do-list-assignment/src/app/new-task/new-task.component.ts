import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


interface Status {
  value: string;
  viewValue: string;
}

interface Priority{
  value: string;
  viewValue: string
}

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})

export class NewTaskComponent implements OnInit {
  selectedStatus!: string;
  selectedPriority!: string;

  Status: Status[] = [
    {value: 'Completed', viewValue: 'Completed'},
    {value: 'Not Shortlisted', viewValue: 'Not Shortlisted'},
    {value: 'In Progress', viewValue: 'In Progress'},
  ];

  Priority: Priority[] = [
    {value: 'Low', viewValue: 'Low'},
    {value: 'High', viewValue: 'High'},
    {value: 'Normal', viewValue: 'Normal'},
  ];

  taskForm!: FormGroup;

  constructor(private apiService : ApiService,
    private dialogRef : MatDialogRef<NewTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public editTask : any
  ){

  }

  ngOnInit(): void {
      this.taskForm = new FormGroup({
        'assignedTo' : new FormControl('', [Validators.required]),
        'status' : new FormControl('', [Validators.required]),
        'date' : new FormControl(''),
        'priority' : new FormControl('', [Validators.required]),
        'description' : new FormControl('')
      });

      if(this.editTask){
        this.taskForm.controls['assignedTo'].setValue(this.editTask.assignedTo);
        this.taskForm.controls['status'].setValue(this.editTask.status);
        this.taskForm.controls['date'].setValue(this.editTask.date);
        this.taskForm.controls['priority'].setValue(this.editTask.priority);
        this.taskForm.controls['description'].setValue(this.editTask.description);
      }
  }

  addTask(){
    if(this.taskForm.valid && !this.editTask){
    this.apiService.postTask(this.taskForm.value).subscribe({
      next: (res) => {
        alert("task saved successfully");
        this.taskForm.reset();
        this.dialogRef.close();
      },
      error : () => {
        alert("error occured while adding task");
      }
    })
    } else if(this.taskForm.valid){
      console.log(this.editTask.id);
      this.apiService.putTask(this.taskForm.value, this.editTask.id).subscribe({
        next: (res) => {
          alert("data updated");
          this.taskForm.reset();
          this.dialogRef.close();  
        },
        error: () => {
          alert("error occured while updating the data");
        }
      })
    }
  }

  
}
