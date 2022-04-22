import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { WebServerService } from "./services/web-server.service";
@Injectable()
export class LoadInterceptor implements HttpInterceptor{
     constructor(private webServer: WebServerService){   }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       return next.handle(req).pipe(
           tap(event =>{
               this.webServer.loader.next(true);
               if(event.type ==HttpEventType.Response)
               {
                   if(event.status==200){
                       this.webServer.loader.next(false);
                   }
               }
           })
       )
    }
}