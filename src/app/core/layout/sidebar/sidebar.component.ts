import { Component, effect, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, } from '@angular/router';
import { ImageModule } from 'primeng/image';
import { filter, take } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { TreeNode } from 'primeng/api';
import { TreeModule } from 'primeng/tree';
import { NavigationMenu } from '../../../shared/utils/app.constant';
import { CommonService } from '../../../shared/service/common.service';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import {

  LayoutModule,
} from '@angular/cdk/layout';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, TreeModule, ButtonModule, ImageModule, LayoutModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent implements OnInit {
  model: any[] = [];
  nodes: TreeNode[] = NavigationMenu;;
  selectedNode!: TreeNode;
  activeRoute!: string;
  isExpanded: boolean = false;
  message: Date = new Date();
  isMobileDevice: boolean = false;
  constructor(public el: ElementRef,
    private router: Router,
    public commonService: CommonService,
    private breakpointObserver: BreakpointObserver
  ) {

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.activeRoute = this.router.url;
      this.selectedNode = this.findNodeByUrl(this.nodes, this.activeRoute);
      if (this.selectedNode != null) { this.selectedNode.expanded = true }

    });

    effect(() => {

    });
    // this.commonService.toggleSideBarEvent().subscribe(toggle => {
    //   this.isExpanded = toggle;
    // });
  }

  ngOnInit() {
    this.commonService.isExpandable$.subscribe(value => {
      this.isExpanded = value;
    });
    this.observeOrientationChanges()
  }

  toggle() {
    this.isExpanded = !this.isExpanded; // Toggle the value
    this.toggleSideNav(this.isExpanded);

  }

  private observeOrientationChanges(): void {

    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.Medium, Breakpoints.Handset])
    this.breakpointObserver
      .observe([Breakpoints.HandsetPortrait, Breakpoints.HandsetLandscape])
      .subscribe((state: BreakpointState) => {

        this.isMobileDevice = state.matches;
      });
  }
  toggleSideNav(value: boolean) {
    this.commonService.isExpandableSubject$.next(value);
  }
  clicktheRoute() {
    if (this.isMobileDevice) {
      this.toggle();
    }

  }
  findNodeByUrl(nodes: any[], url: string): any {
    for (let node of nodes) {
      if (node.data === url) {
        return node;

      }
      if (node.children) {
        const foundNode = node.children.filter((x: any) => url.includes(x.data))
        if (foundNode.length > 0) {
          return node;
        }
      }
    }
    return null;
  }


  onNodeExpand(event: any) {
    this.selectedNode = event.node;
    this.alternateExpand()
  }
  onNodeSelect(event: any) {

    this.selectedNode = event.node;
    this.selectedNode.expanded = true;

    if (event.node.data) {
      this.router.navigate([event.node.data]);
    }
    if (this.selectedNode.children) {
      this.alternateExpand();
    }

  }

  nodeUnselect(event: any) {
    this.selectedNode = event.node;
    this.selectedNode.expanded = false;
    if (event.node.data) {
      this.router.navigate([event.node.data]);
    }
  }


  getIconClass(node: TreeNode) {
    if (node.children) {
      return node.expanded ? node.styleClass + '-active' : node.styleClass;
    }
    return '';
  }



  alternateExpand() {

    this.nodes.forEach(x => {
      if (x != this.selectedNode) {
        x.expanded = false
      }
      else {
        x.expanded = true;
      }
    }
    )
  }
}
