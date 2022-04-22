import { HttpClient, HttpHeaderResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

// import { AuthService } from '../services/auth.service';
import {tap} from 'rxjs/operators';
import { WebServerService } from '../services/web-server.service';

export interface userProfile{
  company_name:string,
        department_type: string,
        email:string,
      employee_id: string,
  full_name?:string,
  phone_number?:number,
  profile_image?:string,
  registration_date?:string,
  status?:boolean
  
}

@Component({
  selector: 'app-log-in',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LogInComponent implements OnInit {
  newimgpath:any
  isSuperAdmin=false
  ActiveUserPRofile:userProfile
  email=this.formBuilder.control('')
  password=this.formBuilder.control('')
  
  @ViewChild('emailName') EmailName:ElementRef

  fail:boolean=false
  verifyTokenMessage:string
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private httpClient:HttpClient,
    private webServer:WebServerService
    
   ) {
     this.webServer.apiread()
    }

  ngOnInit(): void {
    if(sessionStorage.getItem('token'))
     {
       this.router.navigate(['./app/traficCount']);
   }

   
  }


  
//login
  onSubmit(){
    this.fail=false
 //console.log(form)
    const email = this.email.value;
    const passwrod = this.password.value;
    console.log(email, passwrod);
    
    if(email=='admin'&&  passwrod=='admin'){
      sessionStorage.setItem('token',"loggedin")
     this.router.navigate(['./app/traficCount']);
     console.log('logged in')
    }
    else{
      this.fail=true
    }
      // this.authService.login(email,passwrod).subscribe((data:any)=>{
      
      //   console.log(data);
      //    if(data.success===true){
      //      this.fail=''
      //      const token=data.token
      //   sessionStorage.setItem('token',token) 
      //    this.authService.getProfile().subscribe((data:any)=>{console.log(data),
      //     this.ActiveUserPRofile=data.message
      //     //converting image Path to correct one
      //     this.newimgpath =this.ActiveUserPRofile.profile_image.replace(/images/gi,"image")
      //     console.log(this.ActiveUserPRofile.profile_image)
      //     this.newimgpath=this.newimgpath.replace(/\\/gi,"/")
      //     this.newimgpath=this.newimgpath.replace(/profile_image/gi,"profile")
      //     this.ActiveUserPRofile.profile_image=this.newimgpath
      //     console.log(this.ActiveUserPRofile.profile_image)
      //     console.log(this.ActiveUserPRofile.profile_image)
      //     console.log(this.ActiveUserPRofile)

      //     this.authService.ProfileSubject.next(this.ActiveUserPRofile)

      //     sessionStorage.setItem('currentProfile',JSON.stringify(this.ActiveUserPRofile))
      //   }) 

        

        

      //      this.router.navigate(['./app/dashboard']);
      //    }
      //    if(data.success===false){
      //      this.fail=data.message
      //    }
      //   })       
      //    //console.log(token)
      //   }

      //   swap(){
      //     this.isSuperAdmin=!this.isSuperAdmin
      //   }
        
  }
    

     
// ForgotFunction(){
//   const currentMail=this.EmailName.nativeElement.value
//   this.authService.forgetPassword(currentMail).subscribe((data:any)=>{
//   this.verifyTokenMessage=data.message,
//   console.log(data.message)
//   this.authService.tokenVerifyMsg.next(this.verifyTokenMessage)
//   })
//   this.router.navigate(['./forgotPassword'])
// }
   

     
  

}

    // let user = {email: '', password: ''};
    // // user.email = this.loginForm.get('email').value;
    // // user.password = this.loginForm.get('password').value;
    // // Process checkout data here
    // this.authService.login(user).then((data) => {
    //   let token = JSON.parse(data.response).jwt_token;
    //   localStorage.setItem('jwt_token', token)
    // })
  
  
