import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // navbarOpen = false;
  // public clicked = false;
  // _el: any;
  // toggleNavbar() {
  //   this.navbarOpen = !this.navbarOpen;
  // }
  // constructor(
  //   private router: Router,
  // ) { }
  ngOnInit() { }
  // onClick(event: Event): void {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   this.clicked = true;
  // }
  // @HostListener('document: click', ['event'])
  // private clickedOutside(event:Event): void {
  //   if (this.clicked) {
  //     this._el.nativeElement.querySelector('.dropdown - menu').classList.toggle('show');
  //   }
  // }

}
