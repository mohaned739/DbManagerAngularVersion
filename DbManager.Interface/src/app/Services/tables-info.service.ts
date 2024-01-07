import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TablesInfoService {

  constructor(private client: HttpClient){}
  GetTableNames(): Promise<string[] | undefined> {
    return new Promise((resolve, reject) => {
      this.client.get<string[]>('https://localhost:7093/api/Database/GetDatabases')
        .subscribe(
          response => {
            resolve(response);
          },
          error => {
            console.error(error.message);
            reject(error);
          }
        );
    });
  }

  GetColumnNames(tableName: string): Promise<string[] | undefined> {
    return new Promise((resolve, reject) => {
      this.client.get<string[]>('https://localhost:7093/api/Database/GetColumns?tableName='+tableName)
        .subscribe(
          response => {
            resolve(response);
          },
          error => {
            console.error(error.message);
            reject(error);
          }
        );
    });
  }

  GetData(tableName: string): Promise<any | undefined> {
    return new Promise((resolve, reject) => {
      this.client.get<string[]>('https://localhost:7093/api/Database/Get'+tableName+'Data')
        .subscribe(
          response => {
            resolve(response);
          },
          error => {
            console.error(error.message);
            reject(error);
          }
        );
    });
  }
}
