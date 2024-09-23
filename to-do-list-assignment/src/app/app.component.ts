import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewTaskComponent } from './new-task/new-task.component';
import { ApiService } from './services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DeleteTaskComponent } from './delete-task/delete-task.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'to-do-list-assignment';
  displayedColumns: string[] = ['assignedTo', 'date', 'description', 'priority', 'status', 'action'];
  dataSource = new MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(public dialog: MatDialog,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
      this.getAllTasks();
  }
  openDialog(){  
    const dialogRef = this.dialog.open(NewTaskComponent, {
      width: '35%'
    });
  }

  getAllTasks(){
    this.apiService.getTask().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;

      },
      error: () => {
        alert("error occured while fetching the data");
      }
    })
  }

  applyFilter(event : Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

  editTask(task : any ){
    this.dialog.open(NewTaskComponent, {
      width: '35%',
      data: task
    })
  }

  deleteTask(element: string){
    this.dialog.open(DeleteTaskComponent, {
      width: '35%',
      data: element
    })
    // this.apiService.deleteTask(id).subscribe({
    //   next: (res) => {
    //     alert("task deleted");
    //     this.dialog.closeAll();
    //   },
    //   error: () => {
    //     alert("error occured while deleting the task");
    //   }
    // })
  }
}
