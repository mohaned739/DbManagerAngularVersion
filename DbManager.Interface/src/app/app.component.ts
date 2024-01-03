import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public Tables: string[] | undefined;
  constructor(private client: HttpClient){}
  ngOnInit(): void {
    this.client.get<string[]>('https://localhost:7093/api/Database/GetDatabases')
    .subscribe(response=>{
      this.Tables = response;
    },
    error=>{
      console.log(error.message);
    });
  }
  title = 'DbManager.Interface';


}
