import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { HomeComponent } from "./home.component";
import { MainComponent } from "./main/main.component";
import { HomeGuard } from "../services/guards/home.guard";

const routes: Routes = [
    { path: "", component: HomeComponent ,children: [
        {path: "main",component:MainComponent},
        ]
        }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class HomeRoutingModule { }
