import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PerimeterComponent } from 'src/app/Features/perimeter/perimeter.component';
import { userProfile } from 'src/app/login/login.component';
import { environment } from 'src/environments/environment';


interface profResponse {
  message: userProfile,
  success: boolean
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  UserProfile: userProfile
  environment_Url = environment.API_URL
  falseMessage: string
  IPChange:boolean=false
  time:boolean=false
  ip=new FormControl('',Validators.required)
  port=new FormControl('',Validators.required)
  timeout=new FormControl(Validators.required)

  constructor( private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('currentProfile')) {
      this.UserProfile = <userProfile>JSON.parse(sessionStorage.getItem('currentProfile'))
      console.log("header" + this.UserProfile)
    }
    else
    {

    }
      // this.authService.ProfileSubject.subscribe((data) => {
      //   this.UserProfile = data
        //sessionStorage.setItem('currentProfile',JSON.stringify(this.UserProfile))
        
      // })
    //this.UserProfile=JSON.parse( sessionStorage.getItem('userProfile'))
  }
  LogOut() {
    var islogout = confirm("Do you want to log out?")
    if (islogout) {
      // this.authService.logOut().subscribe(data => {

      //   sessionStorage.removeItem('token')
        this.router.navigate(['./login'])
        sessionStorage.removeItem('hideforsir')
        // if (sessionStorage.getItem('SupAdmToken')) {

        //   sessionStorage.removeItem('SupAdmToken')
        //   this.authService.isSuperAdmin.next(false)
        //   this.router.navigate(['./superadminLogin'])
        //   sessionStorage.removeItem('hideforsir')
          // sessionStorage.removeItem('SupAdmToken')

      //  }
      sessionStorage.removeItem('token')
        sessionStorage.removeItem('currentProfile')
      // })
    }
  }

  seeProfile(profile: any) {

    console.log("profile Function")
    this.modalService.open(profile)

  }

  passwordChangeModal(change: any) {
    //const token=sessionStorage.getItem('token')
    this.modalService.open(change)

  }
  passwordChange(form: NgForm) {
    const old_Pass = form.value.current_Pass
    const new_Pass = form.value.new_Pass
    // this.authService.ChangePassword(old_Pass, new_Pass).subscribe((data: any) => {
    //   if (data.success === false) {
    //     this.falseMessage = data.message
    //   }
    //   else {
    //     this.falseMessage = ''
    //     alert(data.message)
    //     this.modalService.dismissAll()
    //   }
    // })
  }

  ChangeIP(){
    this.IPChange=!this.IPChange
    this.time=false


  }
  updateIP(){
    var ip=this.ip.value
    var port=this.port.value
    var ipadress="http://"+ip+':'+port+'/'
    localStorage.setItem("changedIP",ipadress)
    console.log(ip)
    console.log(ipadress)
    
   
  }

  changeT(){
    this.time=!this.time
    this.IPChange=false

  }

  updateTimeOut(){
    var newtime=this.timeout.value*1000
    console.log(newtime)
    localStorage.setItem('timeout',String(newtime))
  }

}
