import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Injectable({
  providedIn: 'root'
})
export class FileHelperService {

  constructor() { }
  exportAsExcelFile(json: any[], excelFileName: string, sheetName:string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);  
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };  
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });  
    this.saveAsExcelFile(excelBuffer, excelFileName);  
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    
    const url = window.URL.createObjectURL(data);
    var anchor = document.createElement("a");
    anchor.download = "Traffic_Count.xlsx";
    anchor.href = url;
    anchor.click();
    // window.open(url);
    
  }
appendDataGetSheet(  json: any[],worksheet:any = null,origin:string ='A1', skipHeader:boolean= false): XLSX.WorkSheet{
  if(worksheet == null){
    worksheet= XLSX.utils.json_to_sheet(json);
  }else{
    XLSX.utils.sheet_add_json(worksheet,json,{origin:origin, skipHeader:skipHeader});
  }
  return worksheet;

}
loadExcelWorkbook(worksheet: XLSX.WorkSheet, sheetName:string, fileName:string){
  const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: [sheetName] };
  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  this.saveAsExcelFile(excelBuffer, fileName);
}

}
