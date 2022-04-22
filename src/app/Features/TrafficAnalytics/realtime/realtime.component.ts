// import { formatDate } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { fas } from '@fortawesome/free-solid-svg-icons';
// import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
// import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
// import {Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet } from 'ng2-charts';
// import { ChartItem, SampleModel } from 'src/app/Models/ChartItem';
// import { FileHelperService } from 'src/app/services/file-helper.service';
// import { environment } from 'src/environments/environment';
// import { map } from 'rxjs/operators'
// import { RealtimeItem, RealtimeReqItem,RealtimeData,TrafficCountRangeSelection } from './realtime-model';
// import { ApiResponseItem } from 'src/app/Common/Models/ApiReqResModel';
// import { WebServerService } from 'src/app/services/web-server.service';

// @Component({
//   selector: 'app-realtime',
//   templateUrl: './realtime.component.html',
//   styleUrls: ['./realtime.component.css']
// })
// export class RealtimeComponent implements OnInit {
//   genderChart: ChartItem = new ChartItem();
//   entryExitChart: ChartItem = new ChartItem();
//   ageGroupChart: ChartItem = new ChartItem();
//   EntryCmpChart:ChartItem=new ChartItem();
//   ExitCmpChart:ChartItem=new ChartItem();

//   rangeValue:any
//   TCDaily:any
//   TCDaily2:any
//   ek:number
//   ex:number

//   // Realtime Data Inputs
//   entry: Number = 0;

//   exit: Number = 0;
//   recordsrealtime: RealtimeData[] = [];
//   records: RealtimeData[] = [];
//   recordsRange:RealtimeData[]=[]

//   currentDate = new Date();
//   maxDate = new NgbDate(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, this.currentDate.getDate());

//   // Selected Date Range
//   From!: NgbDate;
//   ToDate: NgbDate = this.maxDate;
//   startTime:string= ' 00:00:00';
//   endTime:string = ' 24:00:00'

//   location: string = "";
//   subLocation: string = "";
//   lastUpdated: string = (new Date()).toDateString();
  


//   RangeSelection:number = 0;


//   constructor(private http: HttpClient, private _fileHelper: FileHelperService,private webService:WebServerService) {
//     monkeyPatchChartJsTooltip();
//     monkeyPatchChartJsLegend();

//   }
//   ngOnInit() {
//     this.SetDefaults();
//     this.realtimeTrafficData();
//     //this.OnRangeChange(0);
//   }

//   // Runs realtime traffic data on location
//   realtimeTrafficData() {

//     try {
//       this.http.get<ApiResponseItem>(environment.API_URL + "/analytics/dashboard/traffic_count", { headers: { 'Content-Type': 'application/json' } })
//         .subscribe(data => {
//               this.recordsrealtime = [];
//               for (var i = 0; i < data.data.length; i++) {
//                 //console.log(data.data[i]);
//                 this.recordsrealtime[i] = data.data[i];
//                 console.log(this.recordsrealtime)

//                 if(data.data[i].analytics_data.length > 1){
//                   console.log("Array Format");
//                   for(var j = 0; j < data.data[i].analytics_data.length; j++){
//                     // Entry Data
//                     if(data.data[i].analytics_data[j].tc_name=="Entry"||data.data[i].analytics_data[j].tc_name=="Entry_0"){
//                       this.recordsrealtime[i].tc_EntryCount = data.data[i].analytics_data[j].tc_count;
//                     }
//                     //Exit Data
//                     if(data.data[i].analytics_data[j].tc_name=="Exit"||data.data[i].analytics_data[j].tc_name=="Exit_0"){
//                       this.recordsrealtime[i].tc_ExitCount = data.data[i].analytics_data[j].tc_count;
//                     }

//                   }
//                 }else{
//                   console.log("Not Array");
//                   this.recordsrealtime[i].tc_EntryCount = data.data[i].analytics_data.tc_count;
//                   this.recordsrealtime[i].tc_ExitCount = 0;
//                 }

//                 this.recordsrealtime[i].cameraid = data.data[i].cameraid;
//                 this.recordsrealtime[i].device_location = data.data[i].device_location;
//                 this.recordsrealtime[i].timestamp = data.data[i].timestamp;
              
//               }
//               //console.log(this.recordsrealtime);

//           },
//           ()=>{
//           }
//         )
//     } catch (error) {

//     }

//   }

//   SetDefaults() {
//     this.ageGroupChart.Type = 'bar';
//     this.ageGroupChart.Labels = ['25-04-2021', '26-04-2021', '27-04-2021', '28-04-2021', '29-04-2021', '30-04-2021', '1-05-2021'];
//     this.ageGroupChart.ArrayDataSet = [
//       { data: [20, 21, 25, 18, 28, 25, 30], label: 'Young age', backgroundColor: 'green' },
//       { data: [35, 48, 40, 31, 45, 50, 58], label: 'Middle age' },
//       { data: [60, 70, 75, 80, 86, 88, 90], label: 'Old age' },
//     ];
   
  
//     this.genderChart.Labels = ['Male', 'Female'];
//     this.genderChart.SingleDataSet = [300, 500];
//     this.genderChart.Type = 'pie';
//     this.genderChart.Colors = [{ backgroundColor: ['rgba(27, 163, 185, 1)', 'rgba(255, 199, 80, 1)'], },]

//     this.entryExitChart.Type = 'bar';
//     this.entryExitChart.Labels =[]
//     this.entryExitChart.ArrayDataSet = [
//       { data: [], label: 'Entries', backgroundColor: 'rgba(27, 163, 185, 1)',barPercentage:0.5},
//       { data: [], label: 'Exits', backgroundColor: 'rgba(255, 199, 80, 1)',barPercentage:0.5 }
//     ];
//   }


//   getFormatedDateString(date :Date, hrs:string):string{
//     var dateString = date.toLocaleDateString('en-GB').toString()
//     dateString = dateString.slice(0,dateString.length-4)+dateString.slice(-2)
//     dateString = dateString + hrs
//     return dateString;
//   }
//   OnRangeChange(dateType: number) {
//     this.SetDefaults();
//     this.RangeSelection= dateType;
//     var reqItem = new TrafficCountRangeSelection();

//   switch (dateType) {
//       case SelectedDateRange.today:
        
//         break;
//       case SelectedDateRange.last7Days:
//        console.log("7 Days");
//        reqItem.device_location="MSIL_DELHI";
//        reqItem.from_date="current_week";
//        this.GetDateRangeData(reqItem);
//         break;
//       case SelectedDateRange.last30Days:
//         console.log("current_month");
//         reqItem.device_location="MSIL_DELHI";
//         reqItem.from_date="current_month";
//         this.GetDateRangeData(reqItem);
//         break;
//       case SelectedDateRange.customDays:
//         console.log("Select Date Range");
//         reqItem.device_location="MSIL_DELHI";
//         if(this.From.month && this.ToDate!.month){
//           console.log("From & To Date Defined");
//           var fromDate = new Date((this.From.month + 1 ).toString()+"/" +this.From.day +"/"+this.From.year.toString());
//           reqItem.from_date =this.getFormatedDateString(fromDate,this.startTime);
//           var toDate = new Date((this.ToDate.month + 1 ).toString()+"/" +this.ToDate.day +"/"+this.ToDate.year.toString());
//           reqItem.to_date =this.getFormatedDateString(toDate,this.endTime);
//           this.GetDateRangeData(reqItem);
//         }
        
//         break;
//       case SelectedDateRange.previousmonth:
//         console.log("previous_month");
//         reqItem.device_location="MSIL_DELHI";
//         reqItem.from_date="previous_month";
//         this.GetDateRangeData(reqItem);
//       break;
//       default:
//         //this.GetData();
//         break;
//     }
//   }

//   GetDateRangeData(obj: TrafficCountRangeSelection) {
//     try {
      
//       var body = JSON.stringify(obj);
//       console.log(body);
//       this.http.post<ApiResponseItem>(environment.API_URL + "/analytics/type/TC/daily", body, { headers: { 'Content-Type': 'application/json'} })
//         .subscribe((data) => {
//           console.log( data.data);

//           var res = data.data;
//           this.records = res;

//           if (res.length == 0) {
//             //this.records = data.data;

//           } else {
//             for (var i = 0; i < res.length; i++) {
               
//               var date = (new Date(res[i].timestamp.toString())).toLocaleDateString()
//               //var index = this.records.findIndex(a => (new Date(a.timestamp.toString())).toLocaleDateString() == date);
             
//               this.entryExitChart.Labels.push((new Date(res[i].timestamp).toLocaleDateString()));
//               this.records[i].timestamp = new Date(res[i].timestamp).toLocaleDateString();
//               this.records[i].device_location =  res[i].device_location;
//               this.records[i].cameraid = res[i].cameraid;

//               console.log(res[i].analytics_data.length);
//               for(var j = 0; j < res[i].analytics_data.length; j++){
//                 // Entry Data
//                 if(res[i].analytics_data[j].tc_name=="Entry"||res[i].analytics_data[j].tc_name=="Entry_0"){
//                   this.entryExitChart.ArrayDataSet[0].data?.push(res[i].analytics_data[j].tc_count);
//                   this.records[i].tc_EntryCount = res[i].analytics_data[j].tc_count;
//                 }
//                 //Exit Data
//                 if(res[i].analytics_data[j].tc_name=="Exit"||res[i].analytics_data[j].tc_name=="Exit_0"){
//                   this.entryExitChart.ArrayDataSet[1].data?.push(res[i].analytics_data[j].tc_count);
//                   this.records[i].tc_ExitCount = res[i].analytics_data[j].tc_count;
//                 }

//               }

              
              
//             }

//           }
//         },
//           err => { },
//           () => {
          
//           }
//         )
//     } catch (error) {

//     }

//   }
//   getChangedValue(event:Event){
//     console.log(event)
//   }

//   Download() {
//     try {
//       var objArry=[]
//       for (var i = 0; i < this.records.length; i++) {
//         objArry.push({ 'SrNo': i + 1
//         , 'Date': this.records[i].timestamp
//         , 'Location': this.records[i].device_location
//         , 'Camera Id': this.records[i].cameraid
//         , 'Entries': this.records[i].tc_EntryCount
//         , 'Exits': this.records[i].tc_ExitCount });
//       }
//        this._fileHelper.exportAsExcelFile(objArry,"Traffic_Count", "Traffic Count")

//     } catch (error) {

//     }
//   }
//    TCcomparision(){
//      this.EntryCmpChart.Type="line";
//      this.EntryCmpChart.Labels=[];
//      this.EntryCmpChart.Plugins=[];
//      this.EntryCmpChart.Options={responsive:true};
//      this.EntryCmpChart.Legend=true;
//      this.EntryCmpChart.ArrayDataSet=[{data:[],label:"Entry1",backgroundColor:"rgba(255,64,123,1)",lineTension:0,fill:false},
//      {data:[],label:"Entry2",backgroundColor:"rgba(100,206,211)",lineTension:0,fill:false}]
  
//      this.ExitCmpChart.Type="line";
//      this.ExitCmpChart.Labels=[];
//      this.ExitCmpChart.Plugins=[];
//      this.ExitCmpChart.Legend=true;
//      this.ExitCmpChart.Options={responsive:true};


//      this.EntryCmpChart.ArrayDataSet=[{data:[],label:'exit1' ,backgroundColor:"rgba(27,163,185,1)",lineTension:0,fill:false},
//      {data:[],label:'exit2' ,backgroundColor:"rgba(255,199,80,1)",lineTension:0,fill:false}]
//   console.log("this is TC Comparision function")
//      this.webService.TCRealTime("MSIL_DELHI","current_month").subscribe((data:ApiResponseItem)=>{
//         console.log("Tc comparision"+data.data)

//         var res = data.data;
//           this.recordsRange = res;

//           if (res.length == 0) {
//             //this.records = data.data;

//           } else {
//             this.ek=0
//             this.ex=0
            
//             for (var i = 0; i < res.length; i++) {
               
//               var date = (new Date(res[i].timestamp.toString())).toLocaleDateString()
//               //var index = this.records.findIndex(a => (new Date(a.timestamp.toString())).toLocaleDateString() == date);
             
//               this.EntryCmpChart.Labels.push((new Date(res[i].timestamp).toLocaleDateString()));
//               this.ExitCmpChart.Labels.push((new Date(res[i].timestamp).toLocaleDateString()));

//               this.recordsRange[i].timestamp = new Date(res[i].timestamp).toLocaleDateString();
//               this.recordsRange[i].device_location =  res[i].device_location;
//               this.recordsRange[i].cameraid = res[i].cameraid;

//               console.log(res[i].analytics_data.length);
//               for(var j = 0; j < res[i].analytics_data.length; j++){
//                 // Entry Data
//                 if(res[i].analytics_data[j].tc_name=="Entry"||res[i].analytics_data[j].tc_name=="Entry_0"){
//                   this.EntryCmpChart.ArrayDataSet[0].data?.push(res[i].analytics_data[j].tc_count);
//                   this.ek ++;
//                   console.log("in if"+ res[i].analytics_data[j])

//                   this.recordsRange[i].tc_EntryCount = res[i].analytics_data[j].tc_count;
//                 }
//                 console.log( res[i].analytics_data[j])

//                 //Exit Data
//                 if(res[i].analytics_data[j].tc_name=="Exit"||res[i].analytics_data[j].tc_name=="Exit_0"){
//                   this.ExitCmpChart.ArrayDataSet[0].data?.push(res[i].analytics_data[j].tc_count);
//                   this.ex++;
//                   this.recordsRange[i].tc_ExitCount = res[i].analytics_data[j].tc_count;
//                 }
                

          
               
//               } 
//            }}})
           
//            this.ek++;
//            this.ex++
           
//         //console.log(data.data)
//         // this.recordsRange=data.data
//         // if(! (this.recordsRange.length>0)){}
//         //  if(this.recordsRange.length>0){
//         //    for (let index = 0; index < data.data.length; index++) {

//         //      const TCDaily= data.data[index].analytics_data
//         //      console.log(index +" const tcdaily"+TCDaily)
//         //      if(TCDaily.length>0){
//         //    for(let j=0;j< TCDaily.length;j++){
//         //      if(TCDaily[j].tc_name=="Entry"||TCDaily[j].tc_name=="Entry_0"){
//         //        console.log(TCDaily.tc_name)
//         //        this.EntryCmpChart.ArrayDataSet[0].data?.push(TCDaily[j].tc_count)
               
//         //        this.EntryCmpChart.Labels.push((new Date(data.data[index].timestamp).toLocaleDateString()));

//         // }
//         //     if(TCDaily[j].tc_name=="Exit"||TCDaily[j].tc_name=="Exit_0"){
//         //       console.log(TCDaily[j])
//         //        this.ExitCmpChart.ArrayDataSet[0].data?.push(TCDaily[j].tc_count)
//         //        this.ExitCmpChart.Labels.push((new Date(data.data[index].timestamp).toLocaleDateString()));

//         //      }
//         //     }
//         //     this.TCDaily=data.data

//         //    }}
         
        
        
        
            
//      this.webService.TCRealTime("MSIL_DELHI","current_month").subscribe((data:ApiResponseItem)=>{
      

//       var res = data.data;
//           this.recordsRange = res;

//           if (res.length == 0) {
//             //this.records = data.data;

//           } else {
//             for (var i = 0; i < res.length; i++) {
               
//               var date = (new Date(res[i].timestamp.toString())).toLocaleDateString()
//               //var index = this.records.findIndex(a => (new Date(a.timestamp.toString())).toLocaleDateString() == date);
             
//               this.EntryCmpChart.Labels.push((new Date(res[i].timestamp).toLocaleDateString()));
//               this.ExitCmpChart.Labels.push((new Date(res[i].timestamp).toLocaleDateString()));

//               this.recordsRange[i].timestamp = new Date(res[i].timestamp).toLocaleDateString();
//               this.recordsRange[i].device_location =  res[i].device_location;
//               this.recordsRange[i].cameraid = res[i].cameraid;

//               console.log(res[i].analytics_data.length);
//               for(var j = 0; j < res[i].analytics_data.length; j++){
//                 // Entry Data
//                 if(res[i].analytics_data[1].tc_name=="Entry"||res[i].analytics_data[j].tc_name=="Entry_0"){
//                   this.EntryCmpChart.ArrayDataSet[1].data?.push(res[i].analytics_data[j].tc_count);
//                   console.log("in if"+ res[i].analytics_data[j])

//                   this.recordsRange[i].tc_EntryCount = res[i].analytics_data[j].tc_count;
//                  }
//                 console.log( res[i].analytics_data[j])
//                 //Exit Data
//                 if(res[i].analytics_data[j].tc_name=="Exit"||res[i].analytics_data[j].tc_name=="Exit_0"){
//                   this.ExitCmpChart.ArrayDataSet[1].data?.push(res[i].analytics_data[j].tc_count);
//                   this.recordsRange[i].tc_ExitCount = res[i].analytics_data[j].tc_count;
//                 }
      
      
      
//       //  if(data.data){
        
//       //    for (let index = 0; index < data.data.length; index++) {
//       //      const TCDaily= data.data[index].analytics_data
//       //      console.log("second"+TCDaily)

           
//       //      for (let j = 0; j < TCDaily.length; j++) {
//       //        console.log(TCDaily[j])
           
//       //     if(TCDaily[j].tc_name=="Entry"||TCDaily[j].tc_name=="Entry_0"){
//       //        this.EntryCmpChart.ArrayDataSet[1].data?.push(TCDaily[j].tc_count)


//       //      }
//       //      if(TCDaily[j].tc_name=="Exit"||TCDaily[j].tc_name=="Exit_0"){
//       //        this.ExitCmpChart.ArrayDataSet[1].data?.push(TCDaily[j].tc_count)
//       //      }
//       //    }}this.TCDaily2=data.data
//       //  }
      
    
//             }}}
//            }) ;this.TCDaily2=2
//   console.log(this.EntryCmpChart.ArrayDataSet)
//    }

//   /* 
//   getFormatedDateString(date :Date, hrs:string):string{
//     var dateString = date.toLocaleDateString('en-GB').toString()
//     dateString = dateString.slice(0,dateString.length-4)+dateString.slice(-2)
//     dateString = dateString + hrs
//     return dateString;
//   }
//   OnRangeChange(dateType: number) {
//     this.RangeSelection= dateType;
//     this.records = []
//     var reqItem = new RealtimeReqItem();
    
//     var previousDate = new Date();
//     reqItem.to_date = this.getFormatedDateString(this.currentDate,this.endTime)

//   switch (dateType) {
//       case SelectedDateRange.today:
//         this.GetData();
//         break;
//       case SelectedDateRange.last7Days:
//         previousDate.setDate(this.currentDate.getDate()-7)
//         reqItem.from_date =this.getFormatedDateString(previousDate,this.startTime)
//         this.GetDateRangeData(reqItem);
//         break;
//       case SelectedDateRange.last30Days:
//         previousDate.setDate(this.currentDate.getDate()-30)
//         reqItem.from_date =this.getFormatedDateString(previousDate,this.startTime)
//         this.GetDateRangeData(reqItem);
//         break;
//       case SelectedDateRange.customDays:
//         var date = new Date((this.From.month + 1 ).toString()+"/" +this.From.day +"/"+this.From.year.toString())
//         reqItem.from_date =this.getFormatedDateString(date,this.startTime)
//         this.GetDateRangeData(reqItem);
//         break;
//       default:
//         this.GetData();
//         break;
//     }
//   }


//   GetData() {
//     try {
//       this.http.get<ApiResponseItem>(environment.API_URL + "/analytics/dashboard/traffic_count", { headers: { 'Content-Type': 'application/json' } })
//         .subscribe(data => {
//           var res: RealtimeItem[] = data.data;
//           this.recordsrealtime[0] = data.data[0];
//             this.recordsrealtime[0].analytics_data.exitCount= data.data[1].analytics_data.tc_count

//             this.records[0] = data.data[0];
//             this.records[0].analytics_data.exitCount= data.data[1].analytics_data.tc_count;
//             this.SetChartsData()

//           },
//           ()=>{
//           }
//         )
//     } catch (error) {

//     }
//   }
//   GetDateRangeData(obj: RealtimeReqItem) {
//     try {
//       obj.cameraid="6"
//       var dataState = this.records.length;
//       var body = JSON.stringify(obj)
//       console.log(body)
//       this.http.post<ApiResponseItem>(environment.API_URL + "/analytics/TC/daily", body, { headers: { 'Content-Type': 'application/json' , 'Access-Control-Allow-Origin':'*'} })
//         .subscribe((data) => {
//           var res: RealtimeItem[] = data.data;
//           if (this.records.length == 0) {
//             this.records = data.data;

//           } else {
//             res.forEach(x => {
//               var date = (new Date(x.timestamp.toString())).toLocaleDateString()
//               var index = this.records.findIndex(a => (new Date(a.timestamp.toString())).toLocaleDateString() == date)
//               if (index != -1)
//                 this.records[index].analytics_data.exitCount = x.analytics_data.tc_count;
//             })
//           }
//         },
//           err => { },
//           () => {
//             if (dataState == 0 && this.records.length >0) {
//               obj.tc_name = "Exit"
//               this.GetDateRangeData(obj)
//             }
//             else {
//               this.SetChartsData();
//             }
//           }
//         )
//     } catch (error) {

//     }

//   }
//   SetChartsData() {
//     if(this.records.length == 0 && this.RangeSelection != 0){
//       this.entryExitChart = new ChartItem();
//       this.entryExitChart.Type = 'bar';
//       this.entryExitChart.ArrayDataSet = [
//         { data: [], label: 'Entries', backgroundColor: 'rgba(27, 163, 185, 1)' },
//         { data: [], label: 'Exits', backgroundColor: 'rgba(255, 199, 80, 1)' }
//       ];
//       this.records.push(new RealtimeItem())
//       return;
//     }

//     this.entryExitChart.Type = 'bar';
//     this.entryExitChart.Labels = [];
//     this.entryExitChart.ArrayDataSet = [
//       { data: [], label: 'Entries', backgroundColor: 'rgba(27, 163, 185, 1)' },
//       { data: [], label: 'Exits', backgroundColor: 'rgba(255, 199, 80, 1)' }
//     ];
//     var data: string[] = []
//     for (var i = 0; i < this.records.length; i++) {
//       this.records[i].timestamp = new Date(this.records[i].timestamp).toDateString()
//       this.entryExitChart.Labels.push((new Date(this.records[i].timestamp).toLocaleDateString()))
//       this.entryExitChart.ArrayDataSet[0].data?.push(this.records[i].analytics_data.tc_count)
//       this.entryExitChart.ArrayDataSet[1].data?.push(this.records[i].analytics_data.exitCount)
//     }
//   }
//   Download() {
//     try {
//       var objArry=[]
//       for (var i = 0; i < this.records.length; i++) {
//         objArry.push({ 'SrNo': i + 1
//         , 'Date': this.records[i].timestamp
//         , 'Location': this.records[i].device_location
//         , 'Camera Id': this.records[i].cameraid
//         , 'Entries': this.records[i].analytics_data.tc_count
//         , 'Exits': this.records[i].analytics_data.exitCount });
//       }
//        this._fileHelper.exportAsExcelFile(objArry,"Traffic_Count", "Traffic Count")

//     } catch (error) {

//     }
//   }
// */

// }

// enum SelectedDateRange {
//   today = 0,
//   last7Days = 1,
//   last30Days = 2,
//   customDays = 3,
//   previousmonth = 4,

// }