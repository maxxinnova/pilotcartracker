import { Component, OnInit } from "@angular/core";

import { SettingsService } from "../../core/settings/settings.service";

@Component({
    selector: "app-offsidebar",
    templateUrl: "./offsidebar.component.html",
    styleUrls: ["./offsidebar.component.scss"]
})
export class OffsidebarComponent implements OnInit {

    currentTheme: any ;
    selectedLanguage: string;

    constructor(public settings: SettingsService) {
    }

    ngOnInit() { }
}
