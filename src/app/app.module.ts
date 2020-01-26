import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { NativeScriptUICalendarModule } from "nativescript-ui-calendar/angular";
import { NativeScriptUIChartModule } from "nativescript-ui-chart/angular";
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";
import { NativeScriptUIAutoCompleteTextViewModule } from "nativescript-ui-autocomplete/angular";
import { NativeScriptUIGaugeModule } from "nativescript-ui-gauge/angular";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { ReactiveFormsModule } from "@angular/forms";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { DropDownModule } from "nativescript-drop-down/angular";
import { LoggedGuard } from "./services/guards/logged.guard";
import { HomeGuard } from "./services/guards/home.guard";
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { NativeScriptLoader } from '@danvick/ngx-translate-nativescript-loader';

export function createTranslateLoader() {
    return new NativeScriptLoader("./assets/i18n/", ".json");
}
export const baseUrl="http://stark-sands-45193.herokuapp.com";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    providers:[
    LoggedGuard,
    HomeGuard],

    imports: [
        NativeScriptModule,
        NativeScriptUISideDrawerModule,
        NativeScriptUIListViewModule,
        NativeScriptUICalendarModule,
        NativeScriptUIChartModule,
        NativeScriptUIDataFormModule,
        NativeScriptUIAutoCompleteTextViewModule,
        NativeScriptUIGaugeModule,
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptFormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        DropDownModule,
        NativeScriptHttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader
            }
        })

    ],
    declarations: [
        AppComponent,
        LoginComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
