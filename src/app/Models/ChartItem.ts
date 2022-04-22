import { ChartDataSets, ChartOptions, ChartType } from "chart.js";
import { Color, Label, SingleDataSet } from "ng2-charts";

export class ChartItem {
    Options: ChartOptions = { responsive: true,
        
    };
    Labels: Label[] =[]
    SingleDataSet: SingleDataSet= []
    ArrayDataSet:ChartDataSets[]=[]
    Type: ChartType = 'pie'
    Legend = true;
    Plugins = [];
    Colors : Color[]=[]
    constructor(){
        this.Options = { responsive: true,};
        this.Labels =[]
        this.SingleDataSet= []
        this.ArrayDataSet=[]
        this.Type= 'pie'
        this.Legend = true;
        this.Plugins = [];
        this.Colors =[]
    }
}
export class SampleModel{
    chartItem1:ChartItem = new ChartItem();
    chartItem2:ChartItem = new ChartItem();

}