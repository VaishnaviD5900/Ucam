export class RealtimeReqItem{
    device_location!:string;
    from_date!:string;
    to_date!:string
}

export class RealtimeAnalyticsData{
    tc_count!:number;
    tc_name !:string;
    tc_EntryCount:number;
    tc_ExitCount:number;
    constructor(){
        this.tc_EntryCount=0;
        this.tc_ExitCount=0;
    }

}
export class RealtimeItem {
    analytics_data! :RealtimeAnalyticsData
    cameraid!:string;
    device_location!:string;
    timestamp!:string
    
    constructor() {
        this.analytics_data = new  RealtimeAnalyticsData()
        this.cameraid = 'NA'
        this.device_location = 'NA'
        this.timestamp = 'NA'
        
    }
}

export class RealtimeData {
    cameraid!:string;
    device_location!:string;
    timestamp!:string;
    tc_EntryCount:number;
    tc_ExitCount:number;
    constructor() {
        this.cameraid = 'NA'
        this.device_location = 'NA'
        this.timestamp = 'NA'
        this.tc_EntryCount = 0
        this.tc_ExitCount = 0
    }
}

export class TrafficCountRangeSelection{
    device_location!:string;
    from_date!:string;
    to_date!:string
}
