# DocketrunWebAppNew

UCAM Dashboard is a analytics dashboard that displays the average exit entry count of the UCAM counting device based on the timely analysis done that is weekly analysis,monthly analysis,yearly analysis,interval analysis,quarterly analysis and yearly data analysis.The count is displayed using line graphs that helps in gaining meaningfull insights from the data.

This project was generated with Angular CLI version 12.2.7.

## Packages installed 

 @angular-devkit/build-angular@12.2.7
 @angular/animations@12.2.8
 @angular/cdk@12.2.13
 @angular/cli@12.2.7
 @angular/common@12.2.8
 @angular/compiler-cli@12.2.8
 @angular/compiler@12.2.8
 @angular/core@12.2.8
 @angular/forms@12.2.8
 @angular/localize@12.2.8
 @angular/material@12.2.13
 @angular/platform-browser-dynamic@12.2.8
 @angular/platform-browser@12.2.8
 @angular/router@12.2.8
 @fortawesome/angular-fontawesome@0.9.0
 @fortawesome/fontawesome-svg-core@1.2.35
 @fortawesome/free-solid-svg-icons@5.15.4
 @ng-bootstrap/ng-bootstrap@9.1.3
 @types/exceljs@1.3.0
 @types/file-saver@2.0.3
 @types/jasmine@3.8.2
 @types/jquery@3.5.6
 @types/jspdf@2.0.0
 @types/node@12.20.45
 bootstrap@4.6.0
 chart.js@2.9.4
 chartjs-plugin-datalabels@0.5.0
 chartsjs-plugin-data-labels@0.1.5
 cors@2.8.5
 crypto-browserify@3.12.0
 exceljs@4.3.0
 file-saver@2.0.5
 font-awesome@4.7.0
 hammerjs@2.0.8
 jasmine-core@3.8.0
 jquery@3.6.0
 jspdf-autotable@3.5.20
 jspdf@2.4.0
 karma-chrome-launcher@3.1.0
 karma-coverage@2.0.3
 karma-jasmine-html-reporter@1.7.0
 karma-jasmine@4.0.1
 karma@6.3.4
 lite-server@2.6.1
 ng2-charts@2.4.3
 ngx-bootstrap@7.1.0
 ngx-image-zoom@0.6.0
 ngx-ui-switch@12.0.1
 path-browserify@1.0.1
 popper.js@1.16.1
 rxjs@6.6.7
 tslib@2.3.1
 typescript@4.3.5
 util@0.12.4
 xlsx@0.17.5
 zone.js@0.11.4

 Run `npm install` to install the above packages. (terminal)
 Run `npm install package-name` to install other packages if needed.

 ## Main components
 1. Weekly Analysis
 2. Monthly Analysis
 3. Yearly Analysis
 4. Interval Analysis
 5. Yearly Data Analysis
 6. Quarterly Data Analysis

 Every component has a html,css,chartmodel.ts and component.ts file. Based on the data that needs to be viewed, the respective component is called and its corresponding data is presented to the user.

 For example: Consider the “analysis component”, 
 analysis : On providing the start date and the end date, line chart with entry, exit and average is loaded and the device name, the total entries and the total exits in the given date range are displayed. The loaded chart and the data in the given date range can be downloaded as excel or pdf.

 analysis.component.css: Contains the styles for the html

 analysis.component.html: It contains the structure of the analysis web-page (the excel and pdf buttons, the canvas)

 chartmodel.ts: It is a class that is instantiated whenever chart object is created that is further used to store data retrieved from api and plots the required graph.

 analysis.component.ts: In the submit function the data is being fetched and assigned to labels and data for the chart.

 downloadPdf(): function creates a pdf with the chart and helps in downloading the pdf.

 downloadExcel(): function creates an excel with the chart and helps in downloading the excel.

 Similarly the working is depicted in other components based on the data.

 compare-monthly: It shows the comparison between the averages of the current month and the previous month in the form of a line chart which can be downloaded as an  excel or a pdf.

 compare-weekly: It shows the contrast between the averages, the entries and the exits of the current week and the previous week in the form of a line chart that can be downloaded as an excel or a pdf.

 compare-yearly: It presents the juxtaposition of the averages of the current year and the previous year in a line chart that can be downloaded as an excel or a pdf.

 quarterly:  Quarterly averages are plotted in a line chart that can be easily downloaded as an excel or a pdf.

 yearly: Yearly averages are plotted in a line chart which can be downloaded as an excel or a pdf.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## To change the URL of API

Open assets/config.json  and edit the API_URL with the URL of your choice.

## To add new APIs 

Open services/web-server.service.ts and add the required API.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via Karma.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the Angular CLI Overview and Command Reference page.