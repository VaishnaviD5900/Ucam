'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">docketrun-web-app-new documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-7cac5db13c72be33a1cf7126197265893cc9072ea7cf4069ca227f5be88869d213df5f8383d7fe62597c50d4e212a5ad695a4c7feb75977c31c731411e828af6"' : 'data-target="#xs-components-links-module-AppModule-7cac5db13c72be33a1cf7126197265893cc9072ea7cf4069ca227f5be88869d213df5f8383d7fe62597c50d4e212a5ad695a4c7feb75977c31c731411e828af6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-7cac5db13c72be33a1cf7126197265893cc9072ea7cf4069ca227f5be88869d213df5f8383d7fe62597c50d4e212a5ad695a4c7feb75977c31c731411e828af6"' :
                                            'id="xs-components-links-module-AppModule-7cac5db13c72be33a1cf7126197265893cc9072ea7cf4069ca227f5be88869d213df5f8383d7fe62597c50d4e212a5ad695a4c7feb75977c31c731411e828af6"' }>
                                            <li class="link">
                                                <a href="components/AnalysisComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AnalysisComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CompareMonthlyComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CompareMonthlyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CompareWeeklyComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CompareWeeklyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CompareYearlyComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CompareYearlyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LogInComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LogInComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginHeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginHeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MenubarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MenubarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PerimeterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PerimeterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/QuarterlyComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >QuarterlyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TrafficCountComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TrafficCountComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/YearlyComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >YearlyComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-7cac5db13c72be33a1cf7126197265893cc9072ea7cf4069ca227f5be88869d213df5f8383d7fe62597c50d4e212a5ad695a4c7feb75977c31c731411e828af6"' : 'data-target="#xs-injectables-links-module-AppModule-7cac5db13c72be33a1cf7126197265893cc9072ea7cf4069ca227f5be88869d213df5f8383d7fe62597c50d4e212a5ad695a4c7feb75977c31c731411e828af6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-7cac5db13c72be33a1cf7126197265893cc9072ea7cf4069ca227f5be88869d213df5f8383d7fe62597c50d4e212a5ad695a4c7feb75977c31c731411e828af6"' :
                                        'id="xs-injectables-links-module-AppModule-7cac5db13c72be33a1cf7126197265893cc9072ea7cf4069ca227f5be88869d213df5f8383d7fe62597c50d4e212a5ad695a4c7feb75977c31c731411e828af6"' }>
                                        <li class="link">
                                            <a href="injectables/configService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >configService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/PageSettingComponent.html" data-type="entity-link" >PageSettingComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UserManagementComponent.html" data-type="entity-link" >UserManagementComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/ApiResponseItem.html" data-type="entity-link" >ApiResponseItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/barChartData.html" data-type="entity-link" >barChartData</a>
                            </li>
                            <li class="link">
                                <a href="classes/barChartData-1.html" data-type="entity-link" >barChartData</a>
                            </li>
                            <li class="link">
                                <a href="classes/barChartData-2.html" data-type="entity-link" >barChartData</a>
                            </li>
                            <li class="link">
                                <a href="classes/barChartData-3.html" data-type="entity-link" >barChartData</a>
                            </li>
                            <li class="link">
                                <a href="classes/chartItem.html" data-type="entity-link" >chartItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/chartItem-1.html" data-type="entity-link" >chartItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/chartItem-2.html" data-type="entity-link" >chartItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/chartItem-3.html" data-type="entity-link" >chartItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChartItem.html" data-type="entity-link" >ChartItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/chartItem-4.html" data-type="entity-link" >chartItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/chartItem-5.html" data-type="entity-link" >chartItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/chartItem-6.html" data-type="entity-link" >chartItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/LineChartData.html" data-type="entity-link" >LineChartData</a>
                            </li>
                            <li class="link">
                                <a href="classes/lineChartData.html" data-type="entity-link" >lineChartData</a>
                            </li>
                            <li class="link">
                                <a href="classes/lineChartData-1.html" data-type="entity-link" >lineChartData</a>
                            </li>
                            <li class="link">
                                <a href="classes/lineChartData-2.html" data-type="entity-link" >lineChartData</a>
                            </li>
                            <li class="link">
                                <a href="classes/lineChartData0.html" data-type="entity-link" >lineChartData0</a>
                            </li>
                            <li class="link">
                                <a href="classes/RealtimeAnalyticsData.html" data-type="entity-link" >RealtimeAnalyticsData</a>
                            </li>
                            <li class="link">
                                <a href="classes/RealtimeData.html" data-type="entity-link" >RealtimeData</a>
                            </li>
                            <li class="link">
                                <a href="classes/RealtimeItem.html" data-type="entity-link" >RealtimeItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/RealtimeReqItem.html" data-type="entity-link" >RealtimeReqItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/SampleModel.html" data-type="entity-link" >SampleModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/TrafficCountRangeSelection.html" data-type="entity-link" >TrafficCountRangeSelection</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/configService.html" data-type="entity-link" >configService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExcelsheetService.html" data-type="entity-link" >ExcelsheetService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FileHelperService.html" data-type="entity-link" >FileHelperService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PdfService.html" data-type="entity-link" >PdfService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SearchService.html" data-type="entity-link" >SearchService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WebServerService.html" data-type="entity-link" >WebServerService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/LoadInterceptor.html" data-type="entity-link" >LoadInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthguardGuard.html" data-type="entity-link" >AuthguardGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/SuperAuthGuard.html" data-type="entity-link" >SuperAuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Current_month.html" data-type="entity-link" >Current_month</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/current_week.html" data-type="entity-link" >current_week</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/current_year.html" data-type="entity-link" >current_year</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/interval_data.html" data-type="entity-link" >interval_data</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/jsPDFWithPlugin.html" data-type="entity-link" >jsPDFWithPlugin</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Previous_month.html" data-type="entity-link" >Previous_month</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/profResponse.html" data-type="entity-link" >profResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Quarterly.html" data-type="entity-link" >Quarterly</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/traficCount.html" data-type="entity-link" >traficCount</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/userProfile.html" data-type="entity-link" >userProfile</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/violation.html" data-type="entity-link" >violation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/yearly.html" data-type="entity-link" >yearly</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#pipes-links"' :
                                'data-target="#xs-pipes-links"' }>
                                <span class="icon ion-md-add"></span>
                                <span>Pipes</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="pipes-links"' : 'id="xs-pipes-links"' }>
                                <li class="link">
                                    <a href="pipes/FilterPipe.html" data-type="entity-link" >FilterPipe</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});