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
import { barChartData } from './analysis';
import 'chartjs-plugin-datalabels'
import { MatSnackBar } from '@angular/material/snack-bar';

export interface interval_data {

  avg?: number,
  Average?: number,
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
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})

export class AnalysisComponent implements OnInit {
  IntervalChart: chartItem = new chartItem()
  //entryChart: chartItem = new chartItem()
  barchart: barChartData = new barChartData()
  currentData: interval_data = {}
  from!: NgbDate
  To!: NgbDate
  chart!: Chart
  data: interval_data[] = []
  zoom = 100
  interval_dataData: Observable<interval_data[]> = of([])
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
  IDData: Observable<interval_data[]> = of([])
  loading: boolean = false
  filterOut: FormControl = new FormControl()
  closeModal: any
  dataForExcel: any[] = []
  images: any[] = []
  ExcelData: any
  PdfData: any
  temp: interval_data = {}
  pdfLoader: boolean = false
  excelLoader: boolean = false
  violLength: number = 0
  updatedLen: number = 0
  violdata: any[] = [];
  currentViol!: interval_data
  dataForPdf!: any[]
  show1: number = 15
  show2: number = 30
  show3: number = 60
  startdate = new FormControl(Validators.required)
  enddate = new FormControl(Validators.required)
  updateTO!: number
  isdatewise: boolean = false
  API: any
  interval: any
  BarChartData: barChartData = new barChartData()

  totalEntry: number = 0
  totalExit: number = 0
  totalAvg: number = 0
  FDate!: string
  TDate!: string

  loader2: boolean = false;
  public barCanvas!: CanvasRenderingContext2D


  @ViewChild('lineChart')
  barChart!: ElementRef<HTMLCanvasElement>;

  constructor(private modalService: NgbModal, private http: HttpClient, public excelSheet: ExcelsheetService, public pdfService: PdfService, private webServer: WebServerService, private datepipe: DatePipe,private snackbar:MatSnackBar) {
    this.API = webServer.IP

    this.chartinit()

    this.filterOut.valueChanges.pipe((startWith(''),
      switchMap((text) => this.matches(text)
      )
    )).subscribe(result => {
      this.tempdata = result
      this.IDData = of(result)
      this.sliceVD()
    }
    )

  }

  ngOnInit(): void {
    
  }

  //modal to view the image
  // openImage(imageUrl: string, modal: any) {

  //   this.imageUrl = this.API + '/image/' + imageUrl
  //   // console.log(this.imageUrl)
  //   this.modalService.open(modal, { size: 'lg', windowClass: 'custome', centered: true }).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });

  // }


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

  matches(term: string): Observable<any[]> {
    var resultVD = data.filter((viol:interval_data) => {
      <any>viol.Entry_count
      return viol.Entry_count?.toString().includes(term)
    })

    this.tempdata = resultVD
    const length = resultVD.length;
    this.sliceVD()
    return of(resultVD);
  }


  sliceVD() {
    //this.total = of((this.tempdata.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)).length)
    this.total = of(this.tempdata.length)
    this.IDData = of((this.tempdata.map((div: any, SINo: number) => ({ id: SINo + 1, ...div })).slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)))
  }


  Submit() {
    clearInterval(this.interval)
    this.FDate = ''
    this.TDate = ''
    this.totalEntry = 0
    this.totalExit = 0
    this.totalAvg = 0
    this.loading = true
    this.tempdata = []
    var startdate = this.dateTransform(this.startdate.value)
    var enddate = this.dateTransform(this.enddate.value)
    this.webServer.Interval_data(startdate, enddate).subscribe((response: any) => {
     // console.log(response)

      if (response.success) {
        console.log(response.message)
        if (response.message.length > 0) {

          this.BarChartData.labels = []
          this.BarChartData.exit_counts = []
          this.BarChartData.entry_counts = []
          this.BarChartData.avgs=[]
          this.tempdata = response.message
          if (startdate === enddate) {
            this.FDate != startdate
            this.TDate = ''
          }
          else {
            this.FDate != startdate
            this.TDate != enddate
          }

          for (let i = 0; i < response.message.length; i++) {

            var location = "docketrun"
            var temp = response.message[i];
            this.totalEntry = this.totalEntry + (temp.entry_count)
            this.totalExit = this.totalExit + (temp.exit_count)
            this.currentData.entry_count = this.totalEntry
            this.currentData.exit_count = this.totalExit
            this.currentData.avg = this.totalAvg
            this.currentData.device_name=temp.device_name
            var fromD = this.dateTransform(this.startdate.value)
            var toD = this.dateTransform(this.enddate.value)
            var c = this.datepipe.transform(response.message[i].date, 'dd/MM/yyyy') || '{}';
            console.log(c)
            //var Date = c
            //console.log(Date) 
            if(temp.Entry_count!==0 || temp.Exit_count!==0){
            this.BarChartData.entry_counts.push(temp.entry_count)
            this.BarChartData.exit_counts.push(temp.exit_count)
            this.BarChartData.avgs.push(temp.avg)
            this.BarChartData.labels.push(c)
            }
            this.Chart()
          }
        }
        //console.log(this.currentData)
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
      this.sliceVD()

      this.loading = false
      //console.log(this.tempdata)

    },
    err=>{this.loading=false,
      alert(err.message)
    this.notification('Error while fetching the data','retry')})


  }

  downloadExcel() {
   var tempCanvas = this.barChart.nativeElement.toDataURL('image/png', 1.0)
    var tempLineCanvas = this.barChart.nativeElement.toDataURL('image/png',1.0)
    this.excelSheet.excelLoader = true
    this.images = []
    this.dataForExcel = []
    data.forEach((each: any) => {
      this.dataForExcel.push([each.date, each.avg, each.entry_count, each.exit_count])
    })
    setTimeout(() => {
      this.ExcelData = {
      title: 'Interval Analysis',
      data: this.dataForExcel,
      headers: ["Date", "Average", "Entry  Count", "Exit Count"],
      barImage: tempCanvas,
      lineChartImage: tempLineCanvas,
      }
      this.excelSheet.exportExcel(this.ExcelData)
    }, 10000);  
  }



  downloadPdf() {
    var tempCanvas = this.barChart.nativeElement.toDataURL('image/png', 1.0)
    var tempLineCanvas = this.barChart.nativeElement.toDataURL('image/png', 1.0)
    this.dataForPdf = []
    this.pdfService.pdfLoader = true
    var timeSpentInZone: any[] = []
    this.images = []
    data.forEach((each: any) => {
      this.dataForPdf.push([each.date, each.avg, each.entry_count, each.exit_count])
    })
    setTimeout(() => {
    this.PdfData = {
      title: 'Interval Data',
      data: this.dataForPdf,
      headers: ["Date", "Average", "Entry Count", "Exit Count"],
      // TDMCount: this.DM_TDM_Count,
      // testDriveCount: this.test_drive,
      
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

  chartinit() {
    this.IntervalChart.Options = {
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
    this.IntervalChart.type = "bar"
    this.IntervalChart.labels = []
    this.IntervalChart.plugins = []
    this.IntervalChart.arrayDataSet = [
    { data: [], label: 'Entry', backgroundColor: "rgba(27, 163, 185, 1)",hoverBackgroundColor:"rgba(27, 163, 185, 1)",borderColor:"rgba(27, 163, 185, 1)",pointBackgroundColor:"rgba(27, 163, 185, 1)",pointHoverBackgroundColor:"rgba(27, 163, 185, 1)"},
    { data: [], label: 'Exit', backgroundColor: "rgba(255, 199, 80, 1)",hoverBackgroundColor:"rgba(255, 199, 80, 1)",borderColor: "rgba(255, 199, 80, 1)",pointBackgroundColor:"rgba(255, 199, 80, 1)",pointHoverBackgroundColor:"rgba(255, 199, 80, 1)"},
    { data: [], label: 'Average', backgroundColor: "rgba(255, 0 0, 1)",hoverBackgroundColor:"rgba(255, 0 0, 1)",borderColor:"rgba(255, 0, 0, 1)",pointBackgroundColor:"rgba(255, 0, 0, 1)",pointHoverBackgroundColor:"rgba(255, 0, 0, 1)"}
    ]
  }

Chart() {
    this.IntervalChart.labels = this.BarChartData.labels
    this.IntervalChart.arrayDataSet[0].data = this.BarChartData.entry_counts
    this.IntervalChart.arrayDataSet[1].data = this.BarChartData.exit_counts
    this.IntervalChart.arrayDataSet[2].data = this.BarChartData.avgs

    this.IntervalChart.arrayDataSet[0].label = "Entry"
    this.IntervalChart.arrayDataSet[1].label = "Exit"
    this.IntervalChart.arrayDataSet[2].label = "Average"

    console.log(this.IntervalChart)

  }


  ngOnDestroy() {
    this.modalService.dismissAll()
    clearInterval(this.closeModal)
  }

  dateTransform(date: any) {
    const temp = new Date(date.year, date.month - 1, date.day)
    //console.log(temp)
    const FD = this.datepipe.transform(temp, 'yyyy-MM-dd')
    return FD
  }
  
  notification(message: string, action?: string) {
    this.snackbar.open(message, action ? action : '', ({
      duration: 4000, panelClass: ['error'],
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    })
    )
  }
}