import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrimeNGConfig } from 'primeng/api';
import{CalendarModule} from 'primeng/calendar'

@Component({
  selector: 'app-social-overview',
  templateUrl: './social-overview.component.html',
  styleUrls: ['./social-overview.component.scss'],
  imports:[CalendarModule,FormsModule,CommonModule],
  standalone:true,
  encapsulation:ViewEncapsulation.None
})
export class SocialOverviewComponent implements OnInit {
  constructor(private config: PrimeNGConfig){}
  date2:Date|undefined;
en:any;
  ngOnInit() {
    this.config.overlayOptions.contentStyle
    this.en = {
        firstDayOfWeek: 0,
        dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        dayNamesMin: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        monthNames: [ "January","February","March","April","May","June","July","August","September","October","November","December" ],
        monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
        today: 'Today',
        clear: 'Clear',
        dateFormat: 'mm/dd/yy',
        weekHeader: 'Wk'
    };
}
}
