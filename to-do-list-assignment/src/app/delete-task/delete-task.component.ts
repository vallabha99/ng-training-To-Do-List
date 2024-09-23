import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.scss']
})
export class DeleteTaskComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private dialogRef : MatDialogRef<DeleteTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public deleteTask : any
  ){

  }

  ngOnInit(): void {
      
  }

    
  delete(id: string){

    this.apiService.deleteTask(id).subscribe({
      next: (res) => {
        alert("task deleted");
        this.dialogRef.close();
      },
      error: () => {
        alert("error occured while deleting the task");
        this.dialogRef.close();
      }
    })
  }
}

