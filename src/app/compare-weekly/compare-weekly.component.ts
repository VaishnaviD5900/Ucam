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
import { lineChartData } from './compare-weekly';
import 'chartjs-plugin-datalabels'
import { MatSnackBar } from '@angular/material/snack-bar';
//import ChartDataLabels from 'chartsjs-plugin-data-labels';
//import * as Chart from 'chart.js';
export interface current_week {

  average?: number,
 
  date?: Date | string,
  device_name?: string
  
  entry_count?: number,
  Entry_count?: number,
  entry_time?: string,

  exit_count?: number,
  Exit_count?: number,
  exit_time?: string,

  id?: number
  total?: number
}

var data: any[] = []

@Component({
  selector: 'app-compare-weekly',
  templateUrl: './compare-weekly.component.html',
  styleUrls: ['./compare-weekly.component.css']
})

export class CompareWeeklyComponent implements OnInit {

  CompareWeeklyChart :chartItem = new chartItem()
  entryChart :chartItem = new chartItem()
  exitChart :chartItem = new chartItem()
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
  dataForPdf: any[] = []
  dataForExcel: any[] = []
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
  LineChartData2:lineChartData=new lineChartData()
  interval: any
  loader2: boolean = false;
  public lineCanvas!: CanvasRenderingContext2D
  closeModal: any
  LineChartData: any=[];
  currentData1: any=[];
  total: Observable<number> =of(0);
  loading: boolean= false;
  day !:string
  weekDays : any=[]
  previousAverage: any=[]
  currentAverage: any=[]

  @ViewChild('lineChart')
  barChart!: ElementRef<HTMLCanvasElement>
  

  constructor(private modalService: NgbModal, private http: HttpClient, public excelSheet: ExcelsheetService, public pdfService: PdfService, private webServer: WebServerService, private datepipe: DatePipe,private snackbar:MatSnackBar) { 
   this.chartinit()

  }

  ngOnInit(): void {

    this.data.push(this.webServer.Current_week());
    this.data.push(this.webServer.Previous_week());

   forkJoin(this.data).subscribe(([Response1,Response2])=>{
    this.dataRegister=Response1;
    var res=<any>Response1
    this.dataRegister1=Response2;
      console.log('current_week');
      console.log(JSON.stringify(Response1));
      console.log('previous_week');
      console.log(JSON.stringify(Response2));
      
      if (this.dataRegister.success && this.dataRegister1.success) {
       // console.log(this.dataRegister.success)
        if(this.dataRegister.message.length > 0||this.dataRegister1.message.length >0)
        {
          this.dataRegister1.message.forEach((each:any,index:number) => {
            this.dataForExcel[index]=[each.date,each.average?each.average:0,each.entry_count,each.exit_count,index<res.message.length?res.message[index].date?res.message[index].date:'--':'--',index<res.message.length?res.message[index].average?res.message[index].average:0:0,index<res.message.length?res.message[index].entry_count?res.message[index].entry_count:0:0,index<res.message.length?res.message[index].exit_count?res.message[index].exit_count:0:0]
          });

          this.dataRegister1.message.forEach((each:any,index:number) => {
            this.dataForPdf[index]=[each.date,each.average?each.average:0,each.entry_count,each.exit_count,index<res.message.length?res.message[index].date?res.message[index].date:'--':'--',index<res.message.length?res.message[index].average?res.message[index].average:0:0,index<res.message.length?res.message[index].entry_count?res.message[index].entry_count:0:0,index<res.message.length?res.message[index].exit_count?res.message[index].exit_count:0:0]
          });

          this.LineChartData.labels = []
           this.LineChartData.average=[]
           this.LineChartData.entry_counts=[]
           this.LineChartData.exit_counts=[]
          this.tempdata = this.dataRegister.message
          for (let i = 0; i < this.dataRegister.message.length; i++) {
          var temp = this.dataRegister.message[i]
           var day1 = this.datepipe.transform(new Date(temp.date),'EEEE, MMMM d, y, h:mm:ss')?.split(',')[0]
          let dayName:string = day1 as string
          this.LineChartData.average.push(temp.average)
          this.LineChartData.exit_counts.push(this.dataRegister.message[i].exit_count)
          this.LineChartData.entry_counts.push(temp.entry_count)
          this.LineChartData.labels.push(dayName)
          this.currentAverage.push(temp.average)
          }
          console.log( this.LineChartData.exit_counts)
          console.log(this.LineChartData.labels)

          for (let i = 0; i < this.dataRegister1.message.length; i++) {
            
             var temp2=this.dataRegister1.message[i]
             var day2= this.datepipe.transform(new Date(temp2.date),'EEEE, MMMM d, y, h:mm:ss')?.split(',')[0]
             let day:string =day2 as string
             this.LineChartData2.average.push(temp2.avg)
             this.LineChartData2.exit_counts.push(temp2.exit_count)
              this.LineChartData2.entry_counts.push(temp2.entry_count)
              this.LineChartData2.labels.push(day)
              this.weekDays.push(day)
              this.previousAverage.push(temp2.avg)
          }
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
    this.CompareWeeklyChart.Options = { responsive: true,
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
    this.CompareWeeklyChart.type = 'line'
    this.CompareWeeklyChart.labels = []
    this.CompareWeeklyChart.arrayDataSet = [{
      data: [], label: 'Current week average', borderColor: "rgba(27, 163, 185, 1)", backgroundColor: "rgba(27, 163, 185, 1)", fill: false, pointBackgroundColor: "rgba(27, 163, 185, 1)", lineTension: 0
    },
    
    {data: [], label: 'Previous  week average', borderColor: "rgba(27, 163, 185, 1)", backgroundColor: "rgba(27, 163, 185, 1)", fill: false, pointBackgroundColor: "rgba(27, 163, 186, 1)", lineTension: 0,borderDash:[5,5]}
    
  ]
  this.entryChart.Options = { responsive: true,
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
  this.entryChart.type = 'line'
  this.entryChart.labels = []
  this.entryChart.arrayDataSet = [{
    data: [], label: 'Current week entry', borderColor: "rgba(27, 163, 185, 1)", backgroundColor: "rgba(27, 163, 185, 1)", fill: false, pointBackgroundColor: "rgba(27, 163, 185, 1)", lineTension: 0
  },
  
  {data: [], label: 'Previous  week entry', borderColor: "rgba(27, 163, 185, 1)", backgroundColor: "rgba(27, 163, 185, 1)", fill: false, pointBackgroundColor: "rgba(27, 163, 186, 1)", lineTension: 0,borderDash:[5,5]}
  
]
this.exitChart.Options = { responsive: true,
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
this.exitChart.type = 'line'
this.exitChart.labels = []
this.exitChart.arrayDataSet = [{
  data: [], label: 'Current week exit', borderColor: "rgba(27, 163, 185, 1)", backgroundColor: "rgba(27, 163, 185, 1)", fill: false, pointBackgroundColor: "rgba(27, 163, 185, 1)", lineTension: 0
},

{data: [], label: 'Previous  week exit', borderColor: "rgba(27, 163, 185, 1)", backgroundColor: "rgba(27, 163, 185, 1)", fill: false, pointBackgroundColor: "rgba(27, 163, 186, 1)", lineTension: 0,borderDash:[5,5]}

]
}

  Chart() {
   // console.log(this.LineChartData.exit_counts)
    this.CompareWeeklyChart.labels = this.LineChartData2.labels
    this.CompareWeeklyChart.arrayDataSet[0].data = this.LineChartData.average
    this.CompareWeeklyChart.arrayDataSet[0].label = "Current week Average"
    this.CompareWeeklyChart.arrayDataSet[1].data = this.LineChartData2.average
    this.CompareWeeklyChart.arrayDataSet[1].label="Previous week Average"
    this.entryChart.labels=this.LineChartData2.labels
    this.entryChart.arrayDataSet[0].data=this.LineChartData.entry_counts
    this.entryChart.arrayDataSet[0].label="Current week entry"
    this.entryChart.arrayDataSet[1].data=this.LineChartData2.entry_counts
    this.entryChart.arrayDataSet[1].label="previous week entry"
    this.exitChart.labels=this.LineChartData2.labels
    this.exitChart.arrayDataSet[0].data=this.LineChartData.exit_counts
    this.exitChart.arrayDataSet[0].label="Current week exit"
    this.exitChart.arrayDataSet[1].data=this.LineChartData2.exit_counts
    this.exitChart.arrayDataSet[1].label="previous week exit"
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
    //console.log(tempLineCanvas)
    this.excelSheet.excelLoader = true
    this.images = []
    console.log(this.dataForExcel)
    setTimeout(() => {
      this.ExcelData = {
      title: 'Weekly Analysis',
      data: this.dataForExcel,
      headers: ["Previous week Day", "Previous week average","Previous week entry","Previous week exit","Current week Day","Current week average","Current week entry","Current week exit"],
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
       title: 'Weekly Analysis',
       data: this.dataForPdf,
       headers: ["Previous week Day", "Previous week average","Previous week entry","Previous week exit","Current week Day","Current week average","Current week entry","Current week exit"],
          
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





