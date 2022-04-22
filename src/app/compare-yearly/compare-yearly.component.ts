import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of ,forkJoin} from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { ExcelsheetService } from 'src/app/services/excelsheet.service';
import { PdfService } from 'src/app/services/pdf.service';
import { WebServerService } from 'src/app/services/web-server.service';
import { Chart } from 'chart.js'
import { ChartItem } from 'src/app/Models/ChartItem';
import { chartItem } from './chartModel';
import { DatePipe } from '@angular/common';
import { lineChartData } from './compare-yearly';
import 'chartjs-plugin-datalabels'
import { MatSnackBar } from '@angular/material/snack-bar';

export interface current_year {
  Average?: number,
  month?: string
}

var data: any[] = []

@Component({
  selector: 'app-compare-yearly',
  templateUrl: './compare-yearly.component.html',
  styleUrls: ['./compare-yearly.component.css']
})


export class CompareYearlyComponent implements OnInit {

  CurrentYearChart :chartItem = new chartItem()
  linechart: lineChartData = new lineChartData()
  chart!: Chart
  data:Observable<any[]>[] = []
  imageUrl: string=''
  imgWidth: number = 400
  imgheight: number = 300
  closeResult: string=''
  tempdata: any[] = [];
  page: number = 1
  pageSize: number = 4
  zoom = 100
  pdfLoader: boolean = false
  excelLoader: boolean = false
  violLength: number = 0
  updatedLen: number = 0
  totalAvg: number = 0
  violdata: any[] = [];
  dataForExcel: any[] = []
  dataForPdf: any[] = []
  images: any[] = []
  ExcelData: any
  PdfData: any
  show1: number = 15
  show2: number = 30
  show3: number = 60
  dataRegister:any={}
  dataRegister1:any={}
  updateTO!: number
  isdatewise: boolean = false
  API!:string
  LineChartData2: lineChartData=new lineChartData()
  interval: any
  loader2: boolean = false;
  public lineCanvas!: CanvasRenderingContext2D
  closeModal: any
  LineChartData: any=[];
  currentData1: any=[];
  total: Observable<number> =of(0);
  loading: boolean= false;
  len :any[] = [];

  @ViewChild('lineChart')
  barChart!: ElementRef<HTMLCanvasElement>
  

  constructor(private modalService: NgbModal, private http: HttpClient, public excelSheet: ExcelsheetService, public pdfService: PdfService, private webServer: WebServerService, private datepipe: DatePipe,private snackbar:MatSnackBar) { 
   this.chartinit()

  }

  ngOnInit(): void {

    this.data.push(this.webServer.Current_year());
    this.data.push(this.webServer.Previous_year());

   forkJoin(this.data).subscribe(([Response1,Response2])=>{
    this.dataRegister=Response1;
    var res=<any>Response1
    this.dataRegister1=Response2;
      console.log('current_year');
      console.log(JSON.stringify(Response1));
      console.log('previous_year');
      console.log(JSON.stringify(Response2));
      
      if (this.dataRegister.success && this.dataRegister1.success) {
        console.log(this.dataRegister.success)
        if(this.dataRegister.message.length > 0)

        {
         console.log( res.message[0].average)
          console.log(this.dataRegister1.message)
            
          this.dataRegister1.message.forEach((each:any,index:number) => {
            this.dataForExcel[index]=[each.month,index<res.message.length?res.message[index].average?res.message[index].average:0:0,each.average?each.average:0]
          });

          this.dataRegister1.message.forEach((each:any,index:number) => {
            this.dataForPdf[index]=[each.month,index<res.message.length?res.message[index].average?res.message[index].average:0:0,each.average?each.average:0]
          });

          this.LineChartData.labels = []
           this.LineChartData.average=[]
          
          console.log('111')
          this.tempdata = this.dataRegister.message

          console.log( this.tempdata)

          console.log('111')

          for (let i = 0; i < this.tempdata.length; i++) {
            var temp = this.tempdata[i];
            this.LineChartData.average.push(temp.average)
            this.LineChartData.labels.push(temp.month)
          } 
          for (let i = 0; i < this.dataRegister1.message.length; i++) {
            var temp2=this.dataRegister1.message[i]
             this.LineChartData2.average.push(temp2.average)
             this.LineChartData2.labels.push(temp2.month)
           } 
           //console.log(this.LineChartData2)
           this.Chart()
  
        }

      }
      if (this.tempdata.length > 30) {
        if (this.pageSize < 30) {
          this.pageSize = 30
          this.show1 = 15
          this.show2 = 30
          this.show3 = 40
        }
        else {
          this.pageSize = this.pageSize
        }
      }
      if (this.tempdata.length >= 400) {
        if (this.pageSize < 60) {
          this.pageSize = 60
          this.show1 = 50
          this.show2 = 60
          this.show3 = 70
        }
        else {
          this.pageSize = this.pageSize
        }
      }
      if (this.tempdata.length >= 1000) {
        if (this.pageSize < 100) {
          this.pageSize = 100
          this.show1 = 100
          this.show2 = 150
          this.show3 = 200
        }
        else {
          this.pageSize = this.pageSize
        }
      }
      if (this.tempdata.length >= 2000) {
        if (this.pageSize < 150) {
          this.pageSize = 200
          this.show1 = 200
          this.show2 = 250
          this.show3 = 300
        }
        else {
          this.pageSize = this.pageSize
        }
      }
      if (this.tempdata.length >= 3000) {
        if (this.pageSize < 300) {
          this.pageSize = 300
          this.show1 = 300
          this.show2 = 350
          this.show3 = 400
        }
        else {
          this.pageSize = this.pageSize
        }
      }
     
    
    },
     err=>{this.loading=false,
      alert(err.message)
    this.notification('Error while fetching the data','retry')
  });

    
  }
   private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      this.zoom = 100
      this.imgWidth = 400
      this.imgheight = 300

      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.zoom = 100
      this.imgWidth = 400
      this.imgheight = 300
      return 'by clicking on a backdrop';
    } else {
      this.imgWidth = 400
      this.imgheight = 300
      this.zoom = 100
      return `with: ${reason}`;
    }
  }

 

  sliceVD() {
    this.total = of(this.tempdata.length)
  }
  

  chartinit() {
   this.CurrentYearChart.Options = {
      responsive: true,

      scales: {
        yAxes: [{
           ticks: {
            min: 0,
            beginAtZero: false
                }
              }],
          xAxes: [{
          gridLines: {
            display: false
           }
           }]  
         },
      plugins: {
        datalabels: {
          anchor: 'end',
          align: 'end'
        }
      },
    }
    this.CurrentYearChart.type = "line"
    this.CurrentYearChart.labels = []
    this.CurrentYearChart.plugins = []
    this.CurrentYearChart.Options = { responsive: true,
      scales: {
        yAxes: [{
           ticks: {
            min: 0,
            beginAtZero: false
                }
              }],
          xAxes: [{
          gridLines: {
            display: false
           }
           }]  
         },
      plugins: {
        datalabels: {
          anchor: 'start',
          align: 'top'
        }
      }}
    this.CurrentYearChart.type = 'line'
    this.CurrentYearChart.labels = []
    this.CurrentYearChart.arrayDataSet = [{
      data: [], label: 'Current month average', borderColor: "rgba(27, 163, 185, 1)", backgroundColor: "rgba(27, 163, 185, 1)", fill: false, pointBackgroundColor: "rgba(27, 163, 185, 1)", lineTension: 0
    },
    {data: [], label: 'Previous  month average', borderColor: "rgba(27, 163, 185, 1)", backgroundColor: "rgba(27, 163, 185, 1)", fill: false, pointBackgroundColor: "rgba(27, 163, 186, 1)", lineTension: 0,borderDash:[5,5]}
  ]
}

  Chart() {
    this.CurrentYearChart.labels = this.LineChartData2.labels
    this.CurrentYearChart.arrayDataSet[0].data = this.LineChartData.average
    this.CurrentYearChart.arrayDataSet[0].label = "Current Year Average"
    this.CurrentYearChart.arrayDataSet[1].data=this.LineChartData2.average
    this.CurrentYearChart.arrayDataSet[1].label="previous year average"
  }

  ngOnDestroy() {
    this.modalService.dismissAll()
    clearInterval(this.closeModal)
  }
  notification(message: string, action?: string) {
    console.log('snackbar')
   this.snackbar.open(message, action ? action : '', ({
     duration: 4000, panelClass: ['error'],
     horizontalPosition: 'end',
     verticalPosition: 'bottom',
   })
   )
  }

  downloadExcel() {
    var tempCanvas = this.barChart.nativeElement.toDataURL('image/png', 1.0)
    console.log(tempCanvas)
    var tempLineCanvas = this.barChart.nativeElement.toDataURL('image/png',1.0)
    console.log(this.LineChartData2.labels)
    this.excelSheet.excelLoader = true
    this.images = []
    console.log(this.dataForExcel)
    setTimeout(() => {
      this.ExcelData = {
      title: 'Yearly Analysis',
      data: this.dataForExcel,
      headers: ["Month", "Current year average","Previous year average"],
      barImage: tempCanvas,
      lineChartImage: tempLineCanvas,
      }
      
      this.excelSheet.exportExcel(this.ExcelData)
    }, 10000);  
  }

 downloadPdf() {
   var tempCanvas = this.barChart.nativeElement.toDataURL('image/png', 1.0)
   var tempLineCanvas = this.barChart.nativeElement.toDataURL('image/png', 1.0)
   this.pdfService.pdfLoader = true
   var timeSpentInZone: any[] = []
   this.images = []
   console.log(this.dataForPdf)
   setTimeout(() => {
     this.PdfData = {
       title: 'Yearly Analysis',
       data: this.dataForPdf,
       headers: ["Month", "Current year average","Previous year average"],
          
       barImage: tempCanvas,
       lineChartImage: tempLineCanvas,
       timeSpentInZone: timeSpentInZone
     }
     this.pdfService.createPdf(this.PdfData)
     this.pdfLoader = false
   }, 10000);
 }

 toBase64(url:any, callback:any) {
   var request = new XMLHttpRequest()
   request.onload = function () {
     var reader = new FileReader()
     reader.onloadend = function () {
       callback(reader.result)
     }
     reader.readAsDataURL(request.response)

   }
   request.open('GET', url)
   request.responseType = 'blob'
   request.send()

 }

  
}






