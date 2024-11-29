import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../../../shared/service/common.service';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute, ActivationEnd, Router, RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { environment } from '../../../../environments/environment';
import {
  BreakpointObserver,
  BreakpointState,
  Breakpoints,
  LayoutModule,
} from '@angular/cdk/layout';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, AvatarGroupModule, AvatarModule, LayoutModule, ButtonModule],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  items!: MenuItem[];
  topbarVisible: boolean = false;
  pageTitle: string = 'Page title'
  expanded: boolean = false;
  isValue: boolean = false;
  visibility: boolean = false;
  userEmail: string = 'poojan@delphime.com'
  userName: string = 'Poojan Gujarati'
  UserInitial: string = 'PG';
  mobileOrientationLandscape: boolean = false;
  constructor(private router: Router, private commonService: CommonService, private breakpointObserver: BreakpointObserver) {
    this.router.events.subscribe((rt) => {
      if (rt instanceof ActivationEnd) {
        this.pageTitle = rt.snapshot.routeConfig?.title?.toString() ?? environment.appTitle


      }
    });

  }
  private observeOrientationChanges(): void {


    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.Medium, Breakpoints.Handset])
    this.breakpointObserver
      .observe([Breakpoints.HandsetPortrait, Breakpoints.HandsetLandscape])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.visibility = true;
          this.commonService.isExpandableSubject$.next(false);
        } else {
          this.visibility = false;
        }
      });
  }
  ngOnInit(): void {
    this.commonService.isExpandable$.subscribe(value => {
      this.isValue = value;
      // console.log(this.isValue)
    });
    this.observeOrientationChanges();
  }
  toggle() {
    this.isValue = !this.isValue; // Toggle the value
    this.toggleSideNav(this.isValue);


  }

  toggleSideNav(value: boolean) {
    this.commonService.isExpandableSubject$.next(value);
  }

  public askWithSibyl(event: any): void {
    // console.log('event', event);
    this.commonService.emitButtonClickEvent();
  }

}
