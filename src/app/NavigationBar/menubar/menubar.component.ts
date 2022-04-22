import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// import { AuthService } from 'src/app/services/auth.service';
 
@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {
  showDash=true;
  showSCD=true;
  showFeaturesL=true;
  showCustomer=true;
  navbarOpen = false;
  seeSettings=false
  // public clicked = false;
  UserToggle=false
  showFeature=false
  Settings = false
  NS=false 
  JSW=false
  
  // @ViewChild('_el') _el: ElementRef ;
  toggleNavbar() {
    
  }
  constructor(private router: Router ) { 
    //this._el = new ElementRef(MenubarComponent);
  // this.authServce.isSuperAdmin.subscribe(data=>{
  //   console.log(data)
  //   this.seeSettings=data
  // })
  // if(sessionStorage.getItem('SupAdmToken')){
  //   this.seeSettings=true
 
  // }
  }
  ngOnInit() {
  //   this.authServce.hideforSir.subscribe(data=>{this.showFeature=data;
  //   this.showDash=data;
  // this.showFeaturesL=data
  // console.log(data)})
 
  //  this.authServce.hideforInfo.subscribe(data=>{
  //    this.showFeaturesL=data;
  //    this.showSCD=data
  //  })
 
  //   this.showDash =<boolean>sessionStorage.getItem("hideforsir")
 
  if(sessionStorage.getItem('hideforsir')=="false"){
      this.showSCD=false
      this.showFeaturesL=false
 
  }
  else{
    this.showSCD=true
      this.showFeaturesL=true
 
  }
 
  }
 
  
 
  // onClick(event: Event): void {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   this.clicked = true;
  // }
  // ToggleSubmenus(SubmenuId:string, parentId:string){
  //   var submenu =  document.getElementById(SubmenuId);
  //   var parent =  document.getElementById(parentId);
  //   this.navbarOpen = !this.navbarOpen;
  //   if(submenu != null){
  //     submenu.classList.toggle('show')
  //   }if(parent!=null){
  //     parent.classList.toggle('collapsed')
  //     if(parent.getAttribute('aria-expanded')=='true'){
  //       parent.setAttribute('aria-expanded','false')
  //     }else{
  //       parent.setAttribute('aria-expanded','true')
  //     }
  //   }
  // }
 
  // @HostListener('document: click', ['event'])
  // private clickedOutside(event:Event): void {
  //   // if (this.clicked) {
  //     // this._el.nativeElement.querySelector('.submenu').classList.toggle('show');
  //     // console.log(event)
  //     // document.getElementsByClassName('submenu')[0].classList.add('show');
  //   // }
  // }
  userToggle(){
    this.UserToggle=!this.UserToggle
  }
 
  featuresToggle(){
    this.showFeature=!this.showFeature
  }
  settings(){
 this.Settings = !this.Settings
  }
}