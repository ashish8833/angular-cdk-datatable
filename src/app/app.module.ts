import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { TableComponent } from "./table/table.component";

import { CdkTableModule } from "@angular/cdk/table";
import { TableService } from "./table/table.service";
import { HttpClientModule } from "@angular/common/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
@NgModule({
  declarations: [AppComponent, TableComponent],
  imports: [
    BrowserModule,
    CdkTableModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [TableService],
  bootstrap: [AppComponent]
})
export class AppModule {}
