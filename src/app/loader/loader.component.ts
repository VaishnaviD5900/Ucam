import { Component, OnInit } from '@angular/core';
import { WebServerService } from '../services/web-server.service';
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
 loader !: Boolean ;
  constructor(private webServer: WebServerService) {
    this.webServer.loader.subscribe(res=>{
      this.loader=res;
    })
   }
 
  ngOnInit(): void {
  }
 
}