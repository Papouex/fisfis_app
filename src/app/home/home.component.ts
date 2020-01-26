import { Component, OnInit } from "@angular/core";
import { Page } from "tns-core-modules/ui/page/page";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    constructor(private page:Page) {
        // Use the component constructor to inject providers.
        this.page.actionBarHidden=true;
    }

    ngOnInit(): void {
        // Init your component properties her
    }
}
