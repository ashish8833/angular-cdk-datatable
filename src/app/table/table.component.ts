import { Component, OnInit } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { data, colNames } from "./data";
import { TableService } from "./table.service";
import { FormControl } from "@angular/forms";
@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"]
})
export class TableComponent implements OnInit {
  tableDataSource$ = new BehaviorSubject<any[]>([]);
  currentPage$ = new BehaviorSubject<number>(1);
  totalRecords$ = new BehaviorSubject<number>(1000);
  pageSize$ = new BehaviorSubject<number>(10);
  sortKey$ = new BehaviorSubject<string>("id");
  sortDirection$ = new BehaviorSubject<string>("asc");
  displayedColumns = colNames;
  searchFormControl = new FormControl();
  searchText$ = new BehaviorSubject<string>("");
  constructor(private tableService: TableService) {}
  ngOnInit() {
    this.dataTable();
    this.searchFormControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe(value => {
        this.searchText$.next(value);
        this.currentPage$.next(1);
        this.dataTable();
      });
  }
  levelUp(id: number, index: number) {
    this.tableDataSource$.value[index].coins++;
  }
  pagination(event) {
    this.currentPage$.next(event);
    this.dataTable();
  }

  sort(key) {
    this.currentPage$.next(1);
    if (this.sortKey$.value === key) {
      if (this.sortDirection$.value === "asc") {
        this.sortDirection$.next("desc");
      } else {
        this.sortDirection$.next("asc");
      }
    } else {
      this.sortKey$.next(key);
      this.sortDirection$.next("asc");
    }
    this.dataTable();
  }

  dataTable() {
    this.tableService
      .getData({
        currentPage: this.currentPage$.value,
        pageSize: this.pageSize$.value,
        totalRecords: this.totalRecords$.value,
        orderBy: {
          key: this.sortKey$.value,
          value: this.sortDirection$.value
        },
        search: this.searchText$.value
      })
      .subscribe(
        res => {
          this.tableDataSource$.next(res["data"]);
          this.currentPage$.next(res["currentPage"]);
          this.pageSize$.next(res["pageSize"]);
          this.totalRecords$.next(res["totalRecords"]);
        },
        error => {
          console.log(error);
        }
      );
  }
}
