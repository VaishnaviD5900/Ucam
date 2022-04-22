import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { ExcelsheetService } from 'src/app/services/excelsheet.service';
import { PdfService } from 'src/app/services/pdf.service';
import { WebServerService } from 'src/app/services/web-server.service';
import { Chart } from 'chart.js'
import { ChartItem } from 'src/app/Models/ChartItem';
import { chartItem } from './chartModel';
import { DatePipe } from '@angular/common';
import { barChartData, lineChartData } from './trafficcount';
import 'chartjs-plugin-datalabels'
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbTime } from '@ng-bootstrap/ng-bootstrap/timepicker/ngb-time';
import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';


//import ChartDataLabels from 'chartsjs-plugin-data-labels';
// import * as Chart from 'chart.js';

export interface traficCount {

  Date?: Date | string,
  Device_name?: string
  timestamp?: Date | string | null,
  time_stamp?: Date,
  entry_count?: number,
  Entry_count?: number,
  exit_count?: number,
  Exit_count?: number,

  Time?: string,
  Exit_time?: string
  cameraid?: string,
  camera_id?: string,
  id?: number
}

var data: any[] = []

@Component({
  selector: 'app-traffic-count',
  templateUrl: './traffic-count.component.html',
  styleUrls: ['./traffic-count.component.css']
})
export class TrafficCountComponent implements OnInit {
  time1: NgbTimeStruct = {hour: 13, minute: 30, second: 30};
  time2: NgbTimeStruct = {hour: 13, minute: 30, second: 30};
  seconds = true;
  entryExitChart: chartItem = new chartItem()
  entryChart: chartItem = new chartItem()
  barchart: barChartData = new barChartData()
  //lineChart:lineChartData=new lineChartData()
  currentData: traficCount = {}
  from!: NgbDate
  To!: NgbDate
  second!: NgbTime
  chart!: Chart
  data: traficCount[] = []
  zoom = 100
  traficCountData: Observable<traficCount[]> = of([])
  imageUrl: string=''
  imgWidth: number = 400
  imgheight: number = 300
  closeResult: string=''
  tempdata: any[] = [];
  page: number = 1
  pageSize: number = 4
  FD!: string
  TD!: string
  collectionSize!: number
  total: Observable<number> = of(0)
  TCData: Observable<traficCount[]> = of([])
  loading: boolean = false
  filterOut: FormControl = new FormControl()
  closeModal: any
  dataForExcel: any[] = []
  images: any[] = []
  ExcelData: any
  PdfData: any
  temp: traficCount = {}
  pdfLoader: boolean = false
  excelLoader: boolean = false
  violLength: number = 0
  updatedLen: number = 0
  violdata: any[] = [];
  currentViol!: traficCount
  dataForPdf!: any[]
  show1: number = 15
  show2: number = 30
  show3: number = 60
  fromDate = new FormControl(Validators.required)
  toDate = new FormControl(Validators.required)
  updateTO!: number
  isdatewise: boolean = false
  API: any
  interval: any
  BarChartData: barChartData = new barChartData()
  LineChartData: lineChartData = new barChartData()
  totalEntry: number = 0
  totalExit: number = 0
  FDate!: string
  TDate!: string
  loader2: boolean = false;
  public barCanvas!: CanvasRenderingContext2D
  public lineCanvas!: CanvasRenderingContext2D
  @ViewChild('barChart')
  barChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('lineChart')
  lineChart!: ElementRef<HTMLCanvasElement>;

  constructor(private modalService: NgbModal, private http: HttpClient, public excelSheet: ExcelsheetService, public pdfService: PdfService, private webServer: WebServerService, private datepipe: DatePipe,private snackbar:MatSnackBar) {
    this.API = webServer.IP
    this.chartinit()
    //---------------filter-----------------------
    this.filterOut.valueChanges.pipe((startWith(''),
      switchMap((text) => this.matches(text)))).subscribe(result => 
        {
      this.tempdata = result
      this.TCData = of(result)
      this.sliceVD()
      }
    )

  }

  ngOnInit(): void {
    var yd = new Date()
    console.log(yd)
    var fromDate = this.datepipe.transform(yd, "yyyy-MM-dd hh:mm:ss")
    this.FDate != fromDate
    var toDate = this.datepipe.transform(yd, "yyyy-MM-dd hh:mm:ss")
    console.log(fromDate)
    fromDate=fromDate+' '+'00:00:00'
    toDate=toDate+' '+'23:58:00'
    this.webServer.TCDatewise(toDate, fromDate).subscribe((response: any) => {
      if (response.success) {
        this.loading=false
        console.log(response.message)
        if (response.message.length > 0) {
            for (let i = 0; i < response.message.length; i++) {
            var location = "docketrun"
            var temp = response.message[i];
            this.totalEntry = this.totalEntry + (temp.Entry_count)
            this.totalExit = this.totalExit + (temp.Exit_count)
            this.currentData.entry_count = this.totalEntry
            this.currentData.exit_count = this.totalExit
            this.currentData.Device_name = response.message[i].Device_name
            // if (fromDate === toDate) {
            //   var date = fromDate
            // }
            // else {
            //   date = fromDate + '-' + toDate
            // }
            // console.log(date)
           // this.currentData.timestamp = date
            this.FDate!=fromDate
            this.TDate=''
            var c = this.datepipe.transform(response.message[i].Date, 'dd/MM/yyyy') + " " + response.message[i].Time;
            var timestamp = c
            if(temp.Entry_count!==0 || temp.Exit_count!==0){
            this.BarChartData.entry_counts.push(temp.Entry_count)
            this.LineChartData.entry_counts.push(temp.Entry_count)

            this.BarChartData.exit_counts.push(temp.Exit_count)
            this.BarChartData.labels.push(timestamp)
            this.LineChartData.labels.push(timestamp)
            }
            this.Chart()
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
            data = response.message
            this.tempdata = response.message
            this.total = of(this.tempdata.length)
            this.isdatewise=true
            this.sliceVD()

            this.loading = false
            console.log(this.tempdata)
          }
         }
        console.log(this.currentData)
      }
      console.log(this.BarChartData)
      console.log(this.LineChartData)
    },
    err=>{this.loading=false,
    this.notification('Error while fetching the data','retry')}
    )
 this.liveData()
  }


  //modal to view the image
  openImage(imageUrl: string, modal: any) {

    this.imageUrl = this.API + '/image/' + imageUrl
    // console.log(this.imageUrl)
    this.modalService.open(modal, { size: 'lg', windowClass: 'custome', centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }


//------------function which occurs when the modal closes--------
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

//---------------------function for filtering the data----------
  matches(term: string): Observable<any[]> {
    var resultVD = data.filter((viol:traficCount) => {
      <any>viol.Entry_count
      return viol.Entry_count?.toString().includes(term)
    })
    this.tempdata = resultVD
    const length = resultVD.length;
    this.sliceVD()
    return of(resultVD);
  }


  sliceVD()
   {    this.total = of(this.tempdata.length)
    this.TCData = of((this.tempdata.map((div: any, SINo: number) => ({ id: SINo + 1, ...div })).slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)))
  }


  Submit() {
    clearInterval(this.interval)
    this.FDate = ''
    this.TDate = ''
    this.totalEntry = 0
    this.totalExit = 0
    this.loading = true
    this.tempdata = []
    var fromDate = this.dateTransform(this.fromDate.value)
    var toDate = this.dateTransform(this.toDate.value)
    this.webServer.TCDatewise(fromDate, toDate).subscribe((response: any) => {
     // console.log(response)
    if (response.success) {
        console.log(response.message)
        if (response.message.length > 0) {
          this.LineChartData.labels = []

          this.BarChartData.labels = []
          this.BarChartData.exit_counts = []
          this.BarChartData.entry_counts = []
          this.LineChartData.entry_counts = []
          this.tempdata = response.message
          if (fromDate === toDate) {
            this.FDate != fromDate
            this.TDate = ''
          }
          else {
            this.FDate != fromDate
            this.TDate != toDate
          }

          for (let i = 0; i < response.message.length; i++) {

            var location = "docketrun"
            var temp = response.message[i];
            this.totalEntry = this.totalEntry + (temp.Entry_count)
            this.totalExit = this.totalExit + (temp.Exit_count)
            this.currentData.entry_count = this.totalEntry
            this.currentData.exit_count = this.totalExit
            this.currentData.Device_name=temp.Device_name
            var fromD = this.dateTransform(this.fromDate.value)
            var toD = this.dateTransform(this.toDate.value)
            // console.log(date)
            // response.message[i].Date=this.dateTransform(response.message[i].Date)
            
            //console.log(date)
            //this.currentData.timestamp=date
            var c = this.datepipe.transform(response.message[i].Date, 'dd/MM/yyyy') + " " + response.message[i].Time;
            var timestamp = c
            //console.log(timestamp)


            
            //console.log(timestamp)
            if(temp.Entry_count!==0 || temp.Exit_count!==0){
            this.BarChartData.entry_counts.push(temp.Entry_count)
            this.LineChartData.entry_counts.push(temp.Entry_count)

            this.BarChartData.exit_counts.push(temp.Exit_count)
            this.BarChartData.labels.push(timestamp)
            this.LineChartData.labels.push(timestamp)
            }
            this.Chart()
          }
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
      data = response.message
      this.tempdata = response.message
      this.total = of(this.tempdata.length)
      // this.isdatewise=true
      this.sliceVD()

      this.loading = false
     // console.log(this.tempdata)


      // (error)=>{
      //   console.log(error.message)
      // this.loading=false
      // }
    },
    
    err=>{this.loading=false,
      alert(err.message)
    this.notification('Error while fetching the data','retry')})


  }

  BackToToday(){
    this.loader2=true

  this.liveData()
  }

  //-------function to download the excel-----------------------------
  downloadExcel() {

   var tempCanvas = this.barChart.nativeElement.toDataURL('image/png', 1.0)
    console.log(tempCanvas)
    var tempLineCanvas = this.lineChart.nativeElement.toDataURL('image/png',1.0)
    // var Ddata=da
    this.excelSheet.excelLoader = true
    this.images = []
    this.dataForExcel = []
    data.forEach((each: any) => {
    this.dataForExcel.push([each.Date, each.Time, each.Entry_count, each.Exit_count])
   })
  setTimeout(() => {
    this.ExcelData = {
      title: 'Traffic Count Data',
      data: this.dataForExcel,
      headers: ["Date", "Time", "Entry  Count", "Exit Count"],
      barImage: tempCanvas,
      lineChartImage: tempLineCanvas,
     
    }
    //console.log(images.length)
    this.excelSheet.exportExcel(this.ExcelData)
  }, 10000);
    //this.excelLoader = false
  }


//------------------download pdf------------------------------
  downloadPdf() {
    var tempCanvas = this.barChart.nativeElement.toDataURL('image/png', 1.0)

    var tempLineCanvas = this.lineChart.nativeElement.toDataURL('image/png', 1.0)
    // var Ddata=this.tempdata
    // console.log(Ddata)
    this.dataForPdf = []
    this.pdfService.pdfLoader = true
    var timeSpentInZone: any[] = []
    this.images = []
    data.forEach((each: any) => {
      this.dataForPdf.push([each.Date, each.Time, each.Entry_count, each.Exit_count])
      // this.images.push(each.imagename)
      // timeSpentInZone.push(each.total_time_spent_in_zone)
    })
    
 setTimeout(() => {
  this.PdfData = {
      title: 'Traffic Count Data',
      data: this.dataForPdf,
      headers: ["Date", "time", "Entry Count", "Exit Count"],
      // TDMCount: this.DM_TDM_Count,
      // testDriveCount: this.test_drive,
      
      barImage: tempCanvas,
      lineChartImage: tempLineCanvas,
      timeSpentInZone: timeSpentInZone
      // timespentzone:TSZString
    }
  this.pdfService.createPdf(this.PdfData)
  this.pdfLoader = false
  }, 10000);
 }

 //---------method to convert image to base64------------
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


  ///------------------------------------------------------------
  chartinit() {
    this.entryExitChart.Options = {
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
    this.entryExitChart.type = "bar"
    this.entryExitChart.labels = []
    this.entryExitChart.plugins = []
    this.entryExitChart.arrayDataSet = [{
      data: [], label: 'Entry', backgroundColor: "rgba(27, 163, 185, 1)", hoverBackgroundColor: "rgba(27, 163, 185, 1)",borderColor:"rgba(27, 163, 185, 1)"
    },
    { data: [], label: 'Exit', backgroundColor: "rgba(255, 199, 80, 1)", hoverBackgroundColor: "rgba(255, 199, 80, 1)",borderColor: "rgba(255, 199, 80, 1)" },
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
      data: [], label: 'Entry', borderColor: "rgba(27, 163, 185, 1)", backgroundColor: "rgba(100, 206, 211, 1)", fill: false, pointBackgroundColor: "rgba(255, 199, 80, 1)", lineTension: 0
    }]

  }
Chart() {
    this.entryExitChart.labels = this.BarChartData.labels
    this.entryExitChart.arrayDataSet[0].data = this.BarChartData.entry_counts
    this.entryExitChart.arrayDataSet[1].data = this.BarChartData.exit_counts
    // this.entryExitChart.arrayDataSet[2].data=this.BarChartData.exit_counts

    this.entryChart.arrayDataSet[0].data = this.LineChartData.entry_counts
    this.entryExitChart.arrayDataSet[0].label = "Entry"
    this.entryExitChart.arrayDataSet[1].label = "Exit"


    this.entryChart.labels = this.LineChartData.labels
    console.log(this.entryExitChart)
    console.log(this.entryExitChart)

  }
 dateTransform(date: any) {
    const temp = new Date(date.year, date.month - 1, date.day)
    console.log(temp)
    const FD = this.datepipe.transform(temp, 'yyyy-MM-dd')


    return FD
  }

  //----------------snack bar to show the status---------------------------------------------
  notification(message: string, action?: string) {
     console.log('snackbar')
    this.snackbar.open(message, action ? action : '', ({
      duration: 4000, panelClass: ['error'],
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    })
    )
  }
 
  liveData(){
    this.interval = setInterval(() => {
    this.webServer.liveDataTC().subscribe((response:any)=>{
      console.log(response)
      if (response.success) {
      this.loader2=false
       this.isdatewise=false
      console.log(response)
      if (response.message.length > 0) {
        this.LineChartData.labels = []

        this.BarChartData.labels = []
        this.BarChartData.exit_counts = []
        this.BarChartData.entry_counts = []
        this.LineChartData.entry_counts = []
        this.tempdata = response.message
        // if (fromDate === toDate) {
        //   this.FDate = fromDate
        //   this.TDate = ''
        // }
        // else {
        //   this.FDate = fromDate
        //   this.TDate = toDate
        // }

        for (let i = 0; i < response.message.length; i++) {

          var location = "docketrun"
          var temp = response.message[i];
          this.totalEntry = this.totalEntry + (temp.Entry_count)
          this.totalExit = this.totalExit + (temp.Exit_count)
          this.currentData.entry_count = this.totalEntry
          this.currentData.exit_count = this.totalExit
          this.currentData.Device_name=temp.Device_name
          var fromD = this.dateTransform(this.fromDate.value)
          var toD = this.dateTransform(this.toDate.value)
          // console.log(date)
          // response.message[i].Date=this.dateTransform(response.message[i].Date)
          
          //console.log(date)
          //this.currentData.timestamp=date
          var c = this.datepipe.transform(response.message[i].Date, 'dd/MM/yyyy') + " " + response.message[i].Time;
          var timestamp = c
          //console.log(timestamp)


          
          //console.log(timestamp)
          if(temp.Entry_count!==0 || temp.Exit_count!==0){
          this.BarChartData.entry_counts.push(temp.Entry_count)
          this.LineChartData.entry_counts.push(temp.Entry_count)

          this.BarChartData.exit_counts.push(temp.Exit_count)
          this.BarChartData.labels.push(timestamp)
          this.LineChartData.labels.push(timestamp)
          }
          this.Chart()
        }


      }

      //console.log(this.currentData)
    }
    //console.log(this.BarChartData)
    //console.log(this.LineChartData)

    //this.tempdata = Response.message

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
    data = response.message
    this.tempdata = response.message
    this.total = of(this.tempdata.length)
    // this.isdatewise=true
    this.sliceVD()

    this.loading = false
   // console.log(this.tempdata)


    // (error)=>{
    //   console.log(error.message)
    // this.loading=false
    // }
  },
  
  err=>{this.loading=false,
    alert(err.message)
  this.notification('Error while fetching the data','retry')})

  },300000)
}

ngOnDestroy() {
  this.modalService.dismissAll()
  clearInterval(this.closeModal)
}



  toggleSeconds() {
    this.seconds = !this.seconds;
  }
}