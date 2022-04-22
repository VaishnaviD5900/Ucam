import { toBase64String } from "@angular/compiler/src/output/source_map";
import * as Chart from "chart.js";
import { ChartDataSets, ChartOptions, ChartType } from "chart.js";
import { Color, Label, SingleDataSet } from "ng2-charts";

export class chartItem{
    
    Options:ChartOptions={responsive:true,
        scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
      }
  

        }
        
    singleDataSet:SingleDataSet=[]
    arrayDataSet:ChartDataSets[]=[]
    plugins:any=[]
    type:ChartType='bar'
    colors:Color[]=[]
    legend=true
    labels:Label[]=[]
    
    constructor(){
        this.Options={responsive:true, scales: {
            yAxes: [{
              
                ticks: {min:0,
                    beginAtZero: false
                    
                }
            }],
            xAxes:[{
              gridLines:{
                display:false
              }
            }]
            
    },
 }
        this.labels=[]
        this.legend=true
        this.colors=[]
        this.type='bar'
        this.singleDataSet=[]
        this.arrayDataSet=[]
        this.plugins=[]  

    }
}