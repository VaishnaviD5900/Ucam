export class barChartData{
    labels!:string[]
    entry_counts!:any[]
    exit_counts!:any[]
    constructor(){
        this.labels=[]
        this.entry_counts=[]
        this.exit_counts=[]
    }
}
export class lineChartData{
    labels!:string[]
    entry_counts:any[]
    // exit_counts!:any[];   
    constructor(){
        this.labels=[]
        this.entry_counts=[]
    }
}