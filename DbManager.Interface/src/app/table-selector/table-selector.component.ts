import { Component, OnInit } from '@angular/core';
import { TablesInfoService } from '../Services/tables-info.service';

@Component({
  selector: 'app-table-selector',
  templateUrl: './table-selector.component.html',
  styleUrls: ['./table-selector.component.css']
})
export class TableSelectorComponent implements OnInit {
  public Tables: string[] | undefined;
  public Columns: string[] | undefined;
  public btnsDisabled: boolean;
  public showTable: boolean;
  public isDataLoaded: boolean;
  public rows: any[] = [];
  data=[
    {
      name:"mercy",age:10,town:"Nairobi",country:"kenya"
    },
    {
      name:"Vincent",age:40,town:"Kampala",country:"Uganda"
    },
    {
      name:"Wesley",age:41,town:"Cairo",country:"Egypt"
    }
  ]

  constructor(private tableService : TablesInfoService){
    this.btnsDisabled = true;
    this.showTable = false;
    this.isDataLoaded = false;
  }
  ngOnInit(): void {
    this.tableService.GetTableNames()
    .then(tables => {
      this.Tables = tables
    })
    .catch(error => {
      console.log(error);
    });
  }
  onTableSelected(event: Event): void {
    this.btnsDisabled = false;
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.tableService.GetColumnNames(selectedValue)
    .then(columns => {
      this.Columns = columns
    })
    .catch(error => {
      console.log(error);
    });
  }

  GetData(){
    debugger;
    var tableName = (<HTMLInputElement>document.getElementById("tableNames")).value;
    this.tableService.GetData(tableName)
    .then((data: any[])=>{
      this.rows = data;
      if(data.length > 0){
        this.Columns = Object.keys(data[0]);
      }

      this.isDataLoaded = true;
    })
    .catch(error =>{
      console.error(error);
    });
  }
}
