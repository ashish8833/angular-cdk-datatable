import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable()
export class TableService {
  constructor(private http: HttpClient) {}
  getData(data) {
    return this.http.post(`http://localhost:3000/users/getgnere`, data);
  }
}
