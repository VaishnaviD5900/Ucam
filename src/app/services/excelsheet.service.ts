import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as Excel from 'exceljs/dist/exceljs.min.js'
import { Cell, Workbook } from 'exceljs';
import { Row } from 'exceljs';


import * as fs from 'file-saver';
import { environment } from 'src/environments/environment';
import { TokenizeResult } from '@angular/compiler/src/ml_parser/lexer';
import { each } from 'jquery';
import { Extension } from 'typescript';
import { WebServerService } from './web-server.service';
import { DatePipe } from '@angular/common';
  

var Tempdata:any[]=[]
var images:any[]=[]
var barImage:any;
//var lineChartImg:any;
@Injectable({
  providedIn: 'root'
})


export class ExcelsheetService {
  base64img!:Blob
  public excelLoader:boolean=false

  

  constructor(private http:HttpClient,private datepipe:DatePipe) { 
    //this.base64img=this.base64converter()
    // 
  }
//   base64converter(){
    
//     this.http.get('/assets/Images/Docketrun_logo.png',{responseType:'blob'}).subscribe(data=>{
//     let filereader=new FileReader()
//     filereader.onloadend=()=>{
//       let base64=filereader.result
//       console.log(base64)
//     }
//      filereader.readAsDataURL(data)
//      this.base64img=data
    
     
//   }
 
//   );
//    return this.base64img


// }


exportExcel(exportData:any){
  let title=exportData.title
  let data=exportData.data
  Tempdata=exportData.data
  let headers=exportData.headers
  //images=exportData.images
var keys=exportData.keys
var values=exportData.values
  let dmCount=exportData.TDMCount
  let testDriveCount=exportData.testDriveCount
  var TSZ=exportData.timespentzone
  barImage=exportData.barImage
  //lineChartImg=exportData.lineChartImage

  let workbook:Workbook=new Excel.Workbook()
  let worksheet=workbook.addWorksheet(title,{views: [{showGridLines: true}]})
  worksheet.pageSetup.printTitlesColumn = 'A';

  worksheet.mergeCells('B1:D3')
  
  worksheet.properties.outlineLevelCol = 2;

  let titlerow=worksheet.getCell('B1')
  titlerow.value=title

  titlerow.font={
    name:'Times New Roman',
    size:16,
    color:{argb:'003157'},
    bold:true
    
  }
  titlerow.border = {
    top: {style:'thin', color: {argb:'CMYKFFFF0000'}},
    left: {style:'thin', color: {argb:'CMYKFFFF0000'}},
    bottom: {style:'thin', color: {argb:'CMYKFFFF0000'}},
    right: {style:'thin', color: {argb:'CMYKFFFF0000'}}
  };

  

  titlerow.alignment={vertical:'middle',horizontal:'center'}
  worksheet.addRow([])


  var addBarChart=workbook.addImage({base64:barImage,extension:'png'})
//var lineChartImage=workbook.addImage({base64:lineChartImg,extension:'png'})
worksheet.mergeCells('A4:C4')
//worksheet.mergeCells('C5:D5')

let titleRow1=worksheet.getCell('A4')
//let titleRow2=worksheet.getCell('C5')

//titleRow1.value="Entry Exit Analysis"
//titleRow2.value="Traffic Count Analysis"

//console.log(barImage)
worksheet.mergeCells('A5:D15')
worksheet.addImage(addBarChart,'A5:D15')
//worksheet.mergeCells('C6:D12')

//worksheet.addImage(lineChartImage,'C6:D12')

worksheet.addRow([])
//console.log(headers)
  let headerRow=worksheet.addRow(headers)
  headerRow.eachCell((cell,number)=>{
    cell.fill={type:'pattern',
    pattern:'solid',
    fgColor:{argb:'4167B8'},
    bgColor:{argb:'4167B8'},
    }
    cell.font={
      bold:true,
      color: { argb: 'FFFFFF' },
      size:12
      
    }
    cell.style={}
    
    
  })
  // worksheet.addColumn([])
  
  // worksheet.mergeCells('B5:D6')
  // let count1=worksheet.getCell('B5')
  // if(dmCount!==0){ 
  // count1.value= "DM TDM meet:"+dmCount
  // }
  // else{
  //   count1.value= "DM TDM meet :"+"0"
  // }
  // count1.fill={
  //   type:'pattern',
  //   bgColor:{argb:'0993ff'}

  // }
  // count1.font={
  //   bold:true,
  //   color:{argb:'FFFFFF'}
  // }

  // worksheet.mergeCells('F5:H6')
  // let count2=worksheet.getCell('F5')
  // if(testDriveCount!==0){
  //   count2.value="Test Drive :"+testDriveCount

  // }
  // else
  // count2.value="Test Drive :"+"0"
  

  // count2.fill={
  //   type:'pattern',
  //   bgColor:{argb:'008a3c'}

  // }
  // // count1.alignment={vertical:'middle',horizontal:'center'}

  // count2.font={
  //   bold:true,
  //   color:{argb:'FFFFFF'}
  // }
  // count2.alignment={vertical:'middle',horizontal:'center'}


  // worksheet.pageSetup.printArea = 'B2:G20'

  let log=workbook.addImage({
    base64:'data:image/png;base64,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',
        extension:'png'
  })
  // worksheet.pageSetup.margins = {
  //   left: 0.7, right: 0.7,
  //   top: 0.75, bottom: 0.75,
  //   header: 0.3, footer: 0.3
  // };


worksheet.mergeCells('A1:A3')
var imgborder= worksheet.addImage(log,'A1:A3')
worksheet.getCell('A1').border = {
  top: {style:'thin',color:{argb:'CMYKFFFF0000'}},
  left: {style:'thin',color:{argb:'CMYKFFFF0000'}},
  bottom: {style:'thin',color:{argb:'CMYKFFFF0000'}},
  right: {style:'thin',color:{argb:'CMYKFFFF0000'}}
};





//console.log(data)


  data.forEach((d:any)=>{
    
    var row= worksheet.addRow(d)

    row.height=60
      row.eachCell((cell,number)=>{
      //   console.log("number"+""+ number)
           // console.log(TSZ)
          // console.log(TSZ[row.number-6])
          // console.log(row.number-6)

        // if(number===7){
        //   // console.log(TSZ[row.number-6])
            
        //   cell.value={
        //     'richText':[{
        //       font: {underline: true}, text: `${TSZ[row.number-6] }\n`

            
                
        //     }]
        //   }
          

          // console.log(TSZ[row.number-6])
           

       
         
         
      //   if(number===1){
      
      //     const imagebase64=workbook.addImage({
      //       base64:images[row.number-6],
      //       extension:'jpeg'
          
      //     })
          
      //   //worksheet.mergeCells('A'+k+':'+'A'+j)
      //     worksheet.addImage(imagebase64,'A'+row.number+':'+'A'+row.number)
         


        
      //  }
     
      })
      // worksheet.getColumn(7).worksheet.addTable({columns:[{name:""}]})
     

  //     for (let i = 0; i < images.length; i++) {
  //      console.log("row"+row.number)
  //       if(row.number-6===i){
  //         console.log("i"+i)
  //         const imagebase64=workbook.addImage({
  //           base64:images[row.number-6],
  //           extension:'jpeg'
          
  //         })
  //         console.log(imagebase64)
  //         var imagecell=row.getCell(1)
  //         worksheet.mergeCells('A'+row.number+':'+'A'+row.number+1)
  //        worksheet.addImage(imagebase64,'A'+row.number+':'+'A'+row.number+1)
  //      }
  //      else
  //      {
  //        continue;
  //      }
    
  // }


     


    for (let rowIndex=0; rowIndex <= worksheet.rowCount; rowIndex++) {
      worksheet.getRow(rowIndex).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
  }
    // pRow.width=dataMax
  })
  worksheet.getColumn(1).width=25

  worksheet.getColumn(2).width=25
  worksheet.getColumn(3).width=25

  worksheet.getColumn(4).width=25
  worksheet.getColumn(5).width=25
  worksheet.getColumn(6).width=25
  worksheet.getColumn(7).width=25
  worksheet.getColumn(8).width=25


  
  //console.log(headers)


  
  workbook.xlsx.writeBuffer().then((data) => {
    var date=this.dateTransform(new Date())
    let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    this.excelLoader=false
    fs.saveAs(blob, title+date+ '.xlsx');
  })

}


private numToAlpha(num : any){
  let alpha=''
for (;num = parseInt((num/26).toString(),10)-1; num >=0) {
 alpha=String.fromCharCode(num%26+0x41)+alpha
}
return alpha

}

dateTransform(date: any) {
  //const temp = new Date(date.year, date.month - 1, date.day)
  //console.log(temp)
  const FD = this.datepipe.transform(date, 'dd/MM/yyyy h:mm:ss a')

  return FD
}
}
