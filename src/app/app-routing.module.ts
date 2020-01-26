import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { LoginComponent } from "./login/login.component";
import { LoggedGuard } from "./services/guards/logged.guard";
import { HomeGuard } from "./services/guards/home.guard";

const routes: Routes = [
    { path: "", redirectTo: "/home/main", pathMatch: "full" },
    { path: "login", component:LoginComponent,canActivate:[LoggedGuard] },
    { path: "home", loadChildren: "./home/home.module#HomeModule",canActivate:[HomeGuard]},
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
