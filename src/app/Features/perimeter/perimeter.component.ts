import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, TemplateRef, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbDate, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { interval, Observable, of, TimeInterval, timer } from 'rxjs';
import { startWith, switchMap, timeout } from 'rxjs/operators';
import { ExcelsheetService } from 'src/app/services/excelsheet.service';
import { PdfService } from 'src/app/services/pdf.service';
import { WebServerService } from 'src/app/services/web-server.service';
import { environment } from 'src/environments/environment';

var data = [{ imageURl: 'https://images.hindustantimes.com/img/2021/09/13/550x309/6d190f42-14a3-11ec-a13e-d4a68f9db710_1631553930291.jpg', camerName: 'south2', timeStamp: new Date().toLocaleString(), cameraid: 'cam23' },
{ imageURl: 'https://images.hindustantimes.com/img/2021/09/13/550x309/6d190f42-14a3-11ec-a13e-d4a68f9db710_1631553930291.jpg', camerName: 'north2', timeStamp: new Date().toLocaleString(), cameraid: 'cam23' },
{ imageURl: 'https://images.hindustantimes.com/img/2021/09/13/550x309/6d190f42-14a3-11ec-a13e-d4a68f9db710_1631553930291.jpg', camerName: 'south3', timeStamp: new Date().toLocaleString(), cameraid: 'cam23' },
{ imageURl: 'https://images.hindustantimes.com/img/2021/09/13/550x309/6d190f42-14a3-11ec-a13e-d4a68f9db710_1631553930291.jpg', camerName: 'north3', timeStamp: new Date().toLocaleString(), cameraid: 'cam23' },
{ imageURl: 'https://images.hindustantimes.com/img/2021/09/13/550x309/6d190f42-14a3-11ec-a13e-d4a68f9db710_1631553930291.jpg', camerName: 'south4', timeStamp: new Date().toLocaleString(), cameraid: 'cam23' },
{ imageURl: 'https://images.hindustantimes.com/img/2021/09/13/550x309/6d190f42-14a3-11ec-a13e-d4a68f9db710_1631553930291.jpg', camerName: 'north4', timeStamp: new Date().toLocaleString(), cameraid: 'cam23' },
{ imageURl: 'https://images.hindustantimes.com/img/2021/09/13/550x309/6d190f42-14a3-11ec-a13e-d4a68f9db710_1631553930291.jpg', camerName: 'south5', timeStamp: new Date().toLocaleString(), cameraid: 'cam23' },
{ imageURl: 'https://images.hindustantimes.com/img/2021/09/13/550x309/6d190f42-14a3-11ec-a13e-d4a68f9db710_1631553930291.jpg', camerName: 'north5', timeStamp: new Date().toLocaleString(), cameraid: 'cam23' },
{ imageURl: 'https://images.hindustantimes.com/img/2021/09/13/550x309/6d190f42-14a3-11ec-a13e-d4a68f9db710_1631553930291.jpg', camerName: 'south6', timeStamp: new Date().toLocaleString(), cameraid: 'cam23' },
{ imageURl: 'https://images.hindustantimes.com/img/2021/09/13/550x309/6d190f42-14a3-11ec-a13e-d4a68f9db710_1631553930291.jpg', camerName: 'north6', timeStamp: new Date().toLocaleString(), cameraid: 'cam23' },
{ imageURl: 'https://images.hindustantimes.com/img/2021/09/13/550x309/6d190f42-14a3-11ec-a13e-d4a68f9db710_1631553930291.jpg', camerName: 'south7', timeStamp: new Date().toLocaleString(), cameraid: 'cam23' }
]

export interface violation {
  cameraid?: string,
  date?: string,
  imagename?: string,
  detected_timestamp?:Date["toLocaleString"],
  exit_timestamp?:Date["toLocaleString"],
  roi_violation_name?:"string"

}

@Component({
  selector: 'app-perimeter',
  templateUrl: './perimeter.component.html',
  styleUrls: ['./perimeter.component.css']
})
export class PerimeterComponent implements OnInit, AfterViewInit, OnDestroy {
  from: NgbDate
  To: NgbDate
  data: violation[] = []
  zoom = 100
  imageUrl: string
  imgWidth: number = 400
  imgheight: number = 300
  closeResult: string;
  tempdata: any[] = [];
  page: number = 1
  pageSize: number = 4
  collectionSize: number
  total: Observable<number> = of(0)
  violData: Observable<any[]> = of([])
  loading: boolean = false
  filterOut: FormControl = new FormControl()
  closeModal: any
  dataForExcel: any[] = []
  images: any[] = []
  ExcelData: any
  pdfLoader: boolean = false
  excelLoader: boolean = false
  violLength: number = 0
  updatedLen: number = 0
  violdata: any[] = [];
  currentViol: violation
  dataForPdf:any[]
  show1:number=2
  show2:number=4
  show3:number=6
  fromDate = new FormControl(Validators.required)
  toDate = new FormControl(Validators.required)
  updateTO:number
  isdatewise:boolean=false
  API:any
  interval:any
  loader2:boolean=false

  @ViewChild('dangerAlert') Violation: TemplateRef<any>;



  constructor(private modalService: NgbModal, private http: HttpClient, private excelSheet: ExcelsheetService, private pdfService: PdfService, private webServer: WebServerService) {
  this.API=webServer.IP

  console.log(this.API)

    this.filterOut.valueChanges.pipe((startWith(''),
      switchMap((text) => this.matches(text)
      )
    )).subscribe(result => {
      this.tempdata = result
      this.violData = of(result)
      this.sliceVD()
    }
    )

  }

  ngOnInit(): void {
    this.violLength = Number(localStorage.getItem("updatedLen"))
    console.log(Number(localStorage.getItem("updatedLen")))
    console.log(this.violLength)
   
    
     this.webServer.JSWViolData().subscribe((Rdata: any) => {
     if (Rdata.success) {
        data = Rdata.message
        console.log(Rdata.message)
       this.tempdata = Rdata.message
       if(this.tempdata.length>30){
        if(this.pageSize<30){
          this.pageSize=30
        this.show1=15
        this.show2=30
        this.show3=40
        }
        else{
          this.pageSize=this.pageSize
        }
      }
      if(this.tempdata.length>=400){
        if(this.pageSize<60){
        this.pageSize=60
        this.show1=30
        this.show2=50
        this.show3=75
        }
        else{
          this.pageSize=this.pageSize
        }
      }
        if(this.tempdata.length>=1000){
          if(this.pageSize<90){
          this.pageSize=100
          this.show1=70
          this.show2=100
          this.show3=150
          }
          else{
            this.pageSize=this.pageSize
          }
      }


      if(this.tempdata.length>=2000){
        if(this.pageSize<150){
        this.pageSize=200
        this.show1=200
        this.show2=300
        this.show3=400
        }
        else{
          this.pageSize=this.pageSize
        }
    }

    if(this.tempdata.length>=3000){
      if(this.pageSize<250){
      this.pageSize=300
      this.show1=300
      this.show2=400
      this.show3= 500
      }
      else{
        this.pageSize=this.pageSize
      }
  }
      this.total = of(this.tempdata.length)
      this.violData=of(Rdata.message)

       this.sliceVD()

     }
   })


  }


  //pop up for violation 
  ngAfterViewInit() {
    console.log(this.webServer.IP)
    // this.dataread()


  }






public dataread(){
  
 this.interval= setInterval(() => {
    if (Number(localStorage.getItem("updatedLen"))) {
      this.violLength = Number(localStorage.getItem("updatedLen"))
    }
    this.webServer.JSWViolData().subscribe((Rdata: any) => {
      if (Rdata.success) {
        //this.violdata = []
       var cviol=Rdata.message
        
       this.total = of(this.violdata.length)
       this.loader2=false
       this.isdatewise=false
          this.violData = of(Rdata.message)
       
        data = Rdata.message
      //  console.log(Rdata.message)
       var data = Rdata.message
        this.violdata=Rdata.message
       this.tempdata=this.violdata
        if(this.tempdata.length>30){
          if(this.pageSize<30){
            this.pageSize=30
          this.show1=15
          this.show2=30
          this.show3=40
          }
          else{
            this.pageSize=this.pageSize
          }
        }
        if(this.tempdata.length>=400){
          if(this.pageSize<60){
          this.pageSize=60
          this.show1=60
          this.show2=70
          this.show3=80
          }
          else{
            this.pageSize=this.pageSize
          }
        }
          if(this.tempdata.length>=1000){
            if(this.pageSize<90){
            this.pageSize=100
            this.show1=70
            this.show2=100
            this.show3=150
            }
            else{
              this.pageSize=this.pageSize
            }
        }


        if(this.tempdata.length>=2000){
          if(this.pageSize<150){
          this.pageSize=200
          this.show1=200
          this.show2=300
          this.show3=400
          }
          else{
            this.pageSize=this.pageSize
          }
      }

      if(this.tempdata.length>=3000){
        if(this.pageSize<300){
        this.pageSize=300
        this.show1=300
        this.show2=350
        this.show3=400
        }
        else{
          this.pageSize=this.pageSize
        }
      }
       
          //console.log(this.violLength)
        localStorage.setItem("updatedLen", JSON.stringify(cviol.length))
        console.log(Number(localStorage.getItem("updatedLen")))

        //this.tempdata = data
        this.sliceVD()
         if(Number(localStorage.getItem("updatedLen"))>this.violLength){
           this.violdata=Rdata.message
           var diff=(Number(localStorage.getItem("updatedLen"))-this.violLength);
            console.log(diff)
        for (let i = 0; i < diff; i++) {
          
          //this.violdata.push(data[i])
         // console.log(this.violdata[i])
          this.showViol(this.Violation, this.violdata[i])
           }
           data=this.violdata
         // console.log(this.violdata)
          this.tempdata = this.violdata
          
          this.sliceVD()
        }
      }

    })
  }, 1000)
}


  //modal to view the image
  openImage(imageUrl: string, modal: any) {

    this.imageUrl =this.API+'/image/'+ imageUrl
    // console.log(this.imageUrl)
    this.modalService.open(modal, { size: 'lg', windowClass: 'custome', centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }


  //MODAL FOR VIOLATION
  showViol(modal: any, currentViol: violation) {
    this.updateTO=this.webServer.timeout
    this.currentViol = currentViol
    var modal1 = this.modalService.open(modal, { backdrop: false, windowClass: 'modalViol', centered: true });
    setTimeout(() => {
      modal1.dismiss()

    }, this.updateTO);

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
    var resultVD = data.filter(viol => {
      return (<String>viol.cameraid).includes(term)
    })

    this.tempdata = resultVD
    const length = resultVD.length;
    //this.total=of(length)
    // resultDevices=(resultDevices.map((div:any, SINo:number) => ({id: SINo + 1, ...div})).slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize));
    //  this.total=of(resultDevices.length)
    this.sliceVD()


    return of(resultVD);


  }
  sliceVD() {

    // this.deviceResult.subscribe(data => {
    //   this.temp = data
    // })
    // if (!this.filterOut.value) {
    //   this.tempdata = this.violdata
    // }

    this.total = of((this.tempdata.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)).length)
    this.total = of(this.tempdata.length)
    this.violData = of((this.tempdata.map((div: any, SINo: number) => ({ id: SINo + 1, ...div })).slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)))



  }


  Submit() {
    this.loading = true
    clearInterval(this.interval)
    this.webServer.JSWDatewise(this.fromDate.value ? this.fromDate.value : '', this.toDate.value ? this.toDate.value : '').subscribe((Response: any) => {
      //console.log(Response)
      if (Response.success) {
       
        //console.log(Response.message)
        data=Response.message
        this.tempdata = data
        this.isdatewise=true

        if(this.tempdata.length>30){
          if(this.pageSize<30){
            this.pageSize=30
          this.show1=15
          this.show2=30
          this.show3=40
          }
          else{
            this.pageSize=this.pageSize
          }
        }
        if(this.tempdata.length>=400){
          if(this.pageSize<60){
          this.pageSize=60
          this.show1=50
          this.show2=60
          this.show3=70
          }
          else{
            this.pageSize=this.pageSize
          }
        }
          if(this.tempdata.length>=1000){
            if(this.pageSize<100){
            this.pageSize=100
            this.show1=100
            this.show2=150
            this.show3=200
            }
            else{
              this.pageSize=this.pageSize
            }
        }
  
  
        if(this.tempdata.length>=2000){
          if(this.pageSize<150){
          this.pageSize=200
          this.show1=200
          this.show2=250
          this.show3=300
          }
          else{
            this.pageSize=this.pageSize
          }
      }
      if(this.tempdata.length>=3000){
        if(this.pageSize<300){
        this.pageSize=300
        this.show1=300
        this.show2=350
        this.show3=400
        }
        else{
          this.pageSize=this.pageSize
        }
    }


        this.total = of(this.tempdata.length)
        this.isdatewise=true
        this.sliceVD()
      
        this.loading=false
        
      }
      this.loading=false
     
    })
    

  }

  BackToToday(){
    this.loader2=true
  
  this.dataread()
  }

  downloadExcel() {
    // var Ddata=data
    this.excelLoader = true
    this.images = []
    this.dataForExcel=[]
   data.forEach((each: any) => {
      this.dataForExcel.push(['--', each.cameraid, each.detected_timestamp,each.exit_timestamp,each.roi_violation_name])
      this.images.push(each.imagename)

    })
   // console.log(this.images)

    var images: any[] = []
    for (let i = 0; i < this.images.length; i++) {
      this.toBase64(this.API+'/image/'+this.images[i], function (base64) {
        images.push(base64)
        console.log(images)
      })

    }
    

     setTimeout(() => {
       
     

      this.ExcelData = {
        title: 'Traffic Count Data',
        data: this.dataForExcel,
        headers: ["image", "cameraid", "detected timestamp","exit timestamp","ROI Name"],
        // TDMCount: this.DM_TDM_Count,
        // testDriveCount: this.test_drive,
        images: images,
        // timespentzone:TSZString
      }
      console.log(images.length)
    }, 8000);
    



    

    setTimeout(() => {
      
    

      this.excelSheet.exportExcel(this.ExcelData)
      this.excelLoader = false
   
   

    }, 9000);

  }



  downloadPdf() {
    // var Ddata=this.tempdata
    // console.log(Ddata)
    this.dataForPdf=[]
    this.pdfLoader = true
    var timeSpentInZone: any[] = []
    this.images = []
    data.forEach((each: any) => {
      this.dataForPdf.push(['--',each.cameraid,each.detected_timestamp,each.exit_timestamp,each.roi_violation_name])
      this.images.push(each.imagename)
      timeSpentInZone.push(each.total_time_spent_in_zone)


    })
    //console.log(this.dataForExcel)

    var images: any[] = []
    console.log(this.images.length)
    for (let i = 0; i < this.images.length; i++) {
      this.toBase64(this.API+'/image/'+this.images[i], function (base64) {
        console.log(base64)
        images.push(base64)
        console.log(images)
      })

    }
    

setTimeout(() => {
  

      this.ExcelData = {
        title: 'Violation Data',
        data: this.dataForExcel,
        headers: ["image", "cameraid", "detected timestamp","exit timestamp","ROI Name"],
        // TDMCount: this.DM_TDM_Count,
        // testDriveCount: this.test_drive,
        images: images,
        timeSpentInZone: timeSpentInZone
        // timespentzone:TSZString
      }
      console.log(images.length)
    }, 9000);
 //console.log(this.ExcelData)


    

setTimeout(() => {
  

      this.pdfService.createPdf(this.ExcelData)
      this.pdfLoader = false
   

    }, 10000);

  }

 toBase64(url, callback) {
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


  ngOnDestroy() {
    this.modalService.dismissAll()
    clearInterval(this.closeModal)
  }

}
