import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { MainComponent } from "./main/main.component";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular/dataform-directives";
import { NativeScriptUIGaugeModule } from "nativescript-ui-gauge/angular/gauges-directives";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { NativeScriptUIAutoCompleteTextViewModule } from "nativescript-ui-autocomplete/angular";
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NativeScriptLoader } from '@danvick/ngx-translate-nativescript-loader';
export function createTranslateLoader() {
    return new NativeScriptLoader("../../assets/i18n/", ".json");
}

@NgModule({
    imports: [
        NativeScriptCommonModule,
        HomeRoutingModule,
        NativeScriptUISideDrawerModule,
        NativeScriptUIDataFormModule,
        NativeScriptUIAutoCompleteTextViewModule,
        NativeScriptUIGaugeModule,
        NativeScriptCommonModule,

        NativeScriptFormsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader
            }
        })
    ],
    declarations: [
        HomeComponent,
        MainComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HomeModule { }
