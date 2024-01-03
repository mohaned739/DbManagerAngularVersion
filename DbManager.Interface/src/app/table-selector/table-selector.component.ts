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

  constructor(private tableService : TablesInfoService){
    this.btnsDisabled = true;
    this.showTable = false;
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
}
