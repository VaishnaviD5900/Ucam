import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { barChartData } from './yearly';
import 'chartjs-plugin-datalabels'
import { MatSnackBar } from '@angular/material/snack-bar';
//import ChartDataLabels from 'chartsjs-plugin-data-labels';
// import * as Chart from 'chart.js';

export interface yearly {

  average?: number,
  Average?: number,


  year?: string
}

var data: any[] = []

@Component({
  selector: 'app-yearly',
  templateUrl: './yearly.component.html',
  styleUrls: ['./yearly.component.css']
})

export class YearlyComponent implements OnInit {

  YearlyChart: chartItem = new chartItem()
  barchart: barChartData = new barChartData()
  currentData: yearly = {}
  chart!: Chart
  data: yearly[] = []
  zoom = 100
  interval_dataData: Observable<yearly[]> = of([])
  imageUrl: string=''
  imgWidth: number = 400
  imgheight: number = 300
  closeResult: string=''
  tempdata: any[] = [];
  page: number = 1
  pageSize: number = 4
  collectionSize!: number
  total: Observable<number> = of(0)
  YDData: Observable<yearly[]> = of([])
  loading: boolean = false
  filterOut: FormControl = new FormControl()
  closeModal: any
  dataForExcel: any[] = []
  images: any[] = []
  ExcelData: any
  PdfData: any
  temp: yearly = {}
  pdfLoader: boolean = false
  excelLoader: boolean = false
  violLength: number = 0
  updatedLen: number = 0
  violdata: any[] = [];
  currentViol!: yearly
  dataForPdf!: any[]
  show1: number = 15
  show2: number = 30
  show3: number = 60
  updateTO!: number
  isdatewise: boolean = false
  API: any
  interval: any
  BarChartData: barChartData = new barChartData()

  totalAverage: number = 0

  loader2: boolean = false;
  public barCanvas!: CanvasRenderingContext2D

  @ViewChild('lineChart')
  barChart!: ElementRef<HTMLCanvasElement>

  constructor(private modalService: NgbModal, private http: HttpClient, public excelSheet: ExcelsheetService, public pdfService: PdfService, private webServer: WebServerService, private datepipe: DatePipe,private snackbar:MatSnackBar) {
    this.API = webServer.IP

    this.chartinit()

    this.filterOut.valueChanges.pipe((startWith(''),
    switchMap((text) => this.matches(text)
    )
    )).subscribe(result => {
      this.tempdata = result
      this.YDData = of(result)
      this.sliceVD()
    }
    )

  }

  ngOnInit(): void {
    this.tempdata = []
    this.webServer.Yearly().subscribe((response: any)=>{
      //console.log(response)

      if(response.success){
        //console.log(response.message)
        if(response.message.length > 0){
          this.BarChartData.labels = []
          this.BarChartData.average = []
          this.tempdata = response.message
          
          for(let i=0; i< response.message.length; i++){
            var temp = response.message[i];
            this.currentData.Average = this.totalAverage
            var y = response.message[i].year
            //console.log(y)

            if(temp.Average!=0){
              this.BarChartData.average.push(temp.average)
              this.BarChartData.labels.push(y)
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
      this.sliceVD()

      this.loading = false
      //console.log(this.tempdata)

    },
    err=>{this.loading=false,
      alert(err.message)
    this.notification('Error while fetching the data','retry')})


  }

    

  openImage(imageUrl: string, modal: any) {

    this.imageUrl = this.API + '/image/' + imageUrl
    // console.log(this.imageUrl)
    this.modalService.open(modal, { size: 'lg', windowClass: 'custome', centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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

  matches(term: string): Observable<any[]> {
    var resultVD = data.filter((viol:yearly) => {
      <any>viol.average
      return viol.average?.toString().includes(term)
    })

    this.tempdata = resultVD
    const length = resultVD.length;
    this.sliceVD()
    return of(resultVD);
  }

  sliceVD() {
    //this.total = of((this.tempdata.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)).length)
    this.total = of(this.tempdata.length)
    this.YDData = of((this.tempdata.map((div: any, SINo: number) => ({ id: SINo + 1, ...div })).slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)))

  }

  chartinit() {
    this.YearlyChart.Options = {
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
    this.YearlyChart.type = "bar"
    this.YearlyChart.labels = []
    this.YearlyChart.plugins = []
    this.YearlyChart.arrayDataSet = [{
      data: [], label: 'Average', backgroundColor: "rgba(27, 163, 185, 1)", hoverBackgroundColor: "rgba(27, 163, 185, 1)",pointBackgroundColor: "rgba(27, 163, 185, 1)",borderColor:"rgba(27, 163, 185, 1)"
    },]
  }

  Chart() {
    this.YearlyChart.labels = this.BarChartData.labels
    this.YearlyChart.arrayDataSet[0].data = this.BarChartData.average
    this.YearlyChart.arrayDataSet[0].label = "Average"
    //console.log(this.YearlyChart)
  }

  ngOnDestroy() {
    this.modalService.dismissAll()
    clearInterval(this.closeModal)
  }


  notification(message: string, action?: string) {
    //console.log('snackbar')
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
     this.dataForExcel = []
     data.forEach((each: any) => {
       this.dataForExcel.push([each.year, each.average])
     },
     )
     setTimeout(() => {
       this.ExcelData = {
       title: 'Yearly Data',
       data: this.dataForExcel,
       headers: ["Year", "Average"],
       barImage: tempCanvas,
       lineChartImage: tempLineCanvas,
       }
       
       this.excelSheet.exportExcel(this.ExcelData)
     }, 10000);  
   }

  downloadPdf() {
    var tempCanvas = this.barChart.nativeElement.toDataURL('image/png', 1.0)

    var tempLineCanvas = this.barChart.nativeElement.toDataURL('image/png', 1.0)
    // var Ddata=this.tempdata
    
    this.dataForPdf = []
    this.pdfService.pdfLoader = true
    var timeSpentInZone: any[] = []
    this.images = []
    data.forEach((each: any) => {
      this.dataForPdf.push([each.year, each.average])
      // this.images.push(each.imagename)
      // timeSpentInZone.push(each.total_time_spent_in_zone)
    })
    setTimeout(() => {
      this.PdfData = {
        title: 'Yearly Data',
        data: this.dataForPdf,
        headers: ["Year", "Average"],
           
        barImage: tempCanvas,
        lineChartImage: tempLineCanvas,
        timeSpentInZone: timeSpentInZone
        // timespentzone:TSZString
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
