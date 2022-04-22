import { DatePipe } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
// import { Livenumberplate } from '../app/smart-dashboard/liveResults';
import { ApiResponseItem } from '../Common/Models/ApiReqResModel';
import { configService } from './config';


@Injectable({
  providedIn: 'root'
})
export class WebServerService {
  fromDate: string = ''
  toDate: string = ''
  Suptoken: string = ''
  public deviceLocalIp = new BehaviorSubject<string>('')
  public devicecloudIP = new BehaviorSubject<string>('')

  public curDeviceId = new BehaviorSubject<string>('')
  localIP: string = ''
  staticIP: string = ''
  IP:any
  timeout!:number

  constructor(private httpClient: HttpClient,private datepipe:DatePipe,private configService:configService) {
    this.Suptoken != sessionStorage.getItem('SupAdmToken')
    
    
   var temp= this.configService.loadJSON('./assets/config.json')
      
      this.IP=temp.API_URL
     // this.timeout=res.timeout
   // console.log(this.IP)
  }
  loader = new BehaviorSubject<Boolean>(false);

  
  TCRealTime(location: string, fromDate: string): Observable<ApiResponseItem> {
    return this.httpClient.post<ApiResponseItem>(environment.API_URL + "/analytics/type/TC/daily", { device_location: location, from_date: fromDate }, { headers: { 'Content-Type': 'application/json' } })
  }
  // customerData(fromDate: string, toDate: string, location: string) {
  //   return this.httpClient.post<getInfoAllRes>(environment.API_URL + "/customer/details/view/all",{}
  //     )
  // }

  updateCustomer(body:any,id:string){
    
   return this.httpClient.post(environment.API_URL+"/customer/details/edit/"+id,body)
  }
  latestCars() {
    return this.httpClient.get<ApiResponseItem>(environment.API_URL + "/car_details/view/latest")
  }

  smartCampusdata(from: string, to: string) {
    if (from && to) {
      this.fromDate = from + " " + "12:43:50"
      this.toDate = to + " " + "12:43:50"
    } else {
      !from && to ? this.fromDate = '' : this.toDate = ''
    }
    return this.httpClient.post<ApiResponseItem>(environment.API_URL + "/lpd/details/view/all", { from_date: this.fromDate, to_date: this.toDate })
  }
  smartCampusAll() {
    return this.httpClient.get<ApiResponseItem>(environment.API_URL + "/lpd/details/view/all")
  }

  getDevices() {
    this.Suptoken != sessionStorage.getItem('SupAdmToken')
    const headers = new HttpHeaders().set('Authorization', 'Bearer' + " " + this.Suptoken)
    return this.httpClient.post<ApiResponseItem>(environment.API_URL + '/device/list', { _id: '' }, { headers: headers })
  }
  addDevice(formData: any) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer' + " " + this.Suptoken)
    return this.httpClient.post<ApiResponseItem>(environment.API_URL + '/device/add', formData, { headers: headers })
  }

  EditDevice(data: any) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer' + " " + this.Suptoken)
    return this.httpClient.post<ApiResponseItem>(environment.API_URL + '/device/edit', data, { headers: headers })
  }

  getcameras(device_id: string) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer' + " " + this.Suptoken)

    return this.httpClient.post<ApiResponseItem>(environment.API_URL + '/camera/camera_under_device', { device_id: device_id }, { headers: headers })

  }

  getCameraDetails(camera_id: string) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer' + " " + this.Suptoken)
    return this.httpClient.post(environment.API_URL + '/camera/list', { _id: camera_id }, { headers: headers })


  }

  addCamera(data: any) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer' + " " + this.Suptoken)


    return this.httpClient.post<ApiResponseItem>(environment.API_URL + '/camera/add', data, { headers: headers })

  }
  editCamera(data: any) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer' + " " + this.Suptoken)
    return this.httpClient.post<ApiResponseItem>(environment.API_URL + '/camera/edit', data, { headers: headers })

  }

  removeCamera(id: string) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer' + " " + this.Suptoken)
    return this.httpClient.post<ApiResponseItem>(environment.API_URL + '/camera/remove', { _id: id }, { headers: headers })
  }

  // AddEdge(data: any) {
  //   const headers = new HttpHeaders().set('Authorization', 'Bearer' + " " + this.Suptoken)
  //   return this.httpClient.post<ApiResponseItem>(environment.API_URL + '/edge/add', data, { headers: headers })

  // }

  // listEdge() {
  //   const headers = new HttpHeaders().set('Authorization', 'Bearer' + " " + this.Suptoken)
  //   return this.httpClient.post<ApiResponseItem>(environment.API_URL + '/edge/list', { _id: '' }, { headers: headers })
  // }

  // removeEdge(id: string) {
  //   const headers = new HttpHeaders().set('Authorization', 'Bearer' + " " + this.Suptoken)
  //   return this.httpClient.post<ApiResponseItem>(environment.API_URL + '/edge/remove', { _id: id }, { headers: headers })

  // }

  // EditEdge(data: any) {
  //   const headers = new HttpHeaders().set('Authorization', 'Bearer' + " " + this.Suptoken)
  //   return this.httpClient.post<ApiResponseItem>(environment.API_URL + '/edge/edit', data, { headers: headers })

  // }

  removeDevice(id: string) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer' + " " + this.Suptoken)
    return this.httpClient.post(environment.API_URL + '/device/remove', { _id: id }, { headers: headers })


    

  }

  RunEdgeCommand() {
    const headers = new HttpHeaders().set('Authorization', 'Bearer' + " " + this.Suptoken)
    this.deviceLocalIp.subscribe(data => {
      console.log(data)
      this.localIP = data
    })
    this.httpClient.post('http://' + this.localIP + '/edge/run_command/command', { token_Status: true })

  }
  restartDevice(resOrShut: string, DeviceID: string) {
    this.deviceLocalIp.subscribe(data => {
      console.log(data)
      this.localIP = data
    })

    const headers = new HttpHeaders().set('Authorization', 'Bearer' + " " + this.Suptoken)
    this.httpClient.post('http://' + this.localIP, { device_id: DeviceID, "restart/shutdown": resOrShut }, { headers: headers })

  }
  Acitveadmins(mail : string , status : boolean){
    const headers = new HttpHeaders().set('Authorization', 'Bearer' + " " + this.Suptoken)
    // headers.append('Content-Type','multipart/form-data')

    return this.httpClient.post(environment.API_URL + '/super_admin/approve_admin', { "email":mail,
    "status":status} , { headers: headers })

  }
  //Service to Edit admin details
  EditAdminsdetails(data : FormData){
    const headers = new HttpHeaders().set('Authorization', 'Bearer' + " " + this.Suptoken)
    headers.append('Content-Type','multipart/form-data')
    return this.httpClient.post(environment.API_URL + '/super_admin/edit_admin', data , { headers: headers })
  }

  //Service to delete admins form the list

  Deleteadmins(id :string) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer' + " " + this.Suptoken)
    // headers.append('Content-Type','multipart/form-data')
  
    return this.httpClient.post(environment.API_URL + '/super_admin/remove_admin',{admin_id:id} , { headers: headers })

  }

  //Add other from superadmin

  Addadmins(data : FormData) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer' + " " + this.Suptoken)
    headers.append('Content-Type','multipart/form-data')

    return this.httpClient.post(environment.API_URL + '/super_admin/add_admin', data , { headers: headers })

  }
  //Service to add other superadmins

  Addsuperadmins(data : FormData) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer' + " " + this.Suptoken)
    headers.append('Content-Type','multipart/form-data')
    console.log(headers)
    console.log(this.Suptoken)
    return this.httpClient.post(environment.API_URL + '/super_admin/add_superadmin', data , { headers: headers })

  }


  //Service to get the  superadmins details

  Getsuperadminslist(id : string) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer' + " " + this.Suptoken)
    // headers.append('Content-Type','multipart/form-data')

    return this.httpClient.post(environment.API_URL + '/super_admin/list_superadmin', {"superadmin_id":''} , { headers: headers })

  }

  


  //Service to delete superadmins from the list

  DeleteSuperadmins(id :string) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer' + " " + this.Suptoken)
    // headers.append('Content-Type','multipart/form-data')

    return this.httpClient.post(environment.API_URL + '/super_admin/remove_superadmin',{superadmin_id:id} , { headers: headers })

  }

//Service to edit superadmins from the list

  Editsuperadmins(data : FormData) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer' + " " + this.Suptoken)
    headers.append('Content-Type','multipart/form-data')
 
    return this.httpClient.post(environment.API_URL + '/super_admin/edit_superadmin', data , { headers: headers })

  }

  //Service for Admins list 

  GetAdminslist(id : string){
    const headers = new HttpHeaders().set('Authorization', 'Bearer' + " " + this.Suptoken)
    // headers.append('Content-Type','multipart/form-data')
  
    return this.httpClient.post(environment.API_URL + '/super_admin/list_admin', {"admin_id":''} , { headers: headers })
  }

  getUserList(id:string){
    const headers = new HttpHeaders().set('Authorization', 'Bearer' + " " + this.Suptoken)

    return this.httpClient.post(environment.API_URL + '/user/list' ,{user_id_mdb:id},{ headers: headers })

  }

  heartbeatCamera(){
    const headers=new HttpHeaders().set('Authorization','Bearer'+" "+this.Suptoken)

    return this.httpClient.post('http://'+this.localIP+'/edge/heartbeat/camera/canonyyyyyy/abc456',{},{headers:headers})
  }

  heartbeatAppli(){
    const headers=new HttpHeaders().set('Autherization',"Bearer"+" "+this.Suptoken)
    return this.httpClient.post('http://'+this.localIP+'/edge/heartbeat/application/canonyyyyyy',{},{headers:headers})
  }

  getInfo(){
    const headers=new HttpHeaders().set('Autherization',"Bearer"+" "+this.Suptoken)
    return this.httpClient.post('http://'+this.localIP+'/edge/heartbeat/application/canonyyyyyy',{},{headers:headers})
  }

  JSWViolData(){
  //environment.API_URL=<string>localStorage.getItem('changedIP')
  return this.httpClient.get(this.IP+"/live_data")


  }

  JSWDatewise(from:NgbDate,to:NgbDate){
    var fromD=this.dateTransform(from)+" "+"00:00:00"
    var toD=this.dateTransform(to)+" "+"23:00:50"
    console.log(fromD,toD)

    return this.httpClient.post(this.IP+'/datewise',{from_date:fromD,to_date:toD})

  }




  dateTransform(date: any) {
    const temp = new Date(date.year, date.month - 1, date.day)
    console.log(temp)
    const FD = this.datepipe.transform(temp, 'dd/MM/yyyy')

    return FD
  }

  liveDataTC(){
    return this.httpClient.get(this.IP+"/live_data")
  }

  TCDatewise(from:any,to:any){
    var fromD=from+" "+"00:00:00"
    var toD=to+" "+"23:59:59"
    console.log(fromD,toD)
    console.log(this.IP)

    return this.httpClient.post(this.IP+'/datewise',{from_date:fromD,to_date:toD})

  }

  Interval_data(from:any,to:any){
    var fromD=from
    var toD=to
    console.log(fromD,toD)
    console.log(this.IP)

    return this.httpClient.post(this.IP+'/ucam/interval',{startdate:fromD,enddate:toD})
  }

  Yearly()
  {
    return this.httpClient.get(this.IP+"/ucam/yearly")
  }

  Current_year():Observable<any[]>
  {
    return this.httpClient.get<any[]>(this.IP + "/ucam/current_year")
  }

  Previous_year():Observable<any[]>
  {
    return this.httpClient.get<any[]>(this.IP + "/ucam/previous_year")
  }

  Current_month():Observable<any[]>
  {
    return this.httpClient.get<any[]>(this.IP + "/ucam/current_month")
  }

  Previous_month():Observable<any[]>
  {
    return this.httpClient.get<any[]>(this.IP + "/ucam/previous_month")
  }

  Current_week():Observable<any[]>
  {
    return this.httpClient.get<any[]>(this.IP + "/ucam/current_week")
  }
  
  Previous_week():Observable<any[]>
  {
    return this.httpClient.get<any[]>(this.IP+"/ucam/previous_week")
  }
  Quarterly()
  {
    return this.httpClient.get(this.IP+"/ucam/quaterly")
  }

  apiread(){
    this.httpClient.get('./assets/config.json').subscribe((res:any)=>{ this.IP=res.API_URL
      this.timeout=res.timeout
    console.log(this.IP)})
  }

  handleError(error:any){
    let errorMessage=''
  if(error.error instanceof ErrorEvent ){
  errorMessage=`Error:${error.error.message}`

  }
  else{
    errorMessage=`status:${error.status}\n message:${error.message}`
    
  }

  window.alert(errorMessage)
  return throwError(errorMessage)
}


}