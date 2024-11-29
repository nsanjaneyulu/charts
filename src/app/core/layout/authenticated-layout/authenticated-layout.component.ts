import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivationEnd, Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { CommonService } from '../../../shared/service/common.service';
import { environment } from '../../../../environments/environment';
import { ChatWithAiComponent } from '../../../shared/components/chat-with-Ai/chat-with-ai.component';
import { SidebarModule } from 'primeng/sidebar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-authenticated-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent, ChatWithAiComponent, SidebarModule, CommonModule],
  templateUrl: './authenticated-layout.component.html',
  styleUrl: './authenticated-layout.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AuthenticatedLayoutComponent implements OnInit {
  title = 'sybilApp';
  pageTitle: string = ''
  message: Date = new Date();
  isClicked: boolean = false;
  public sidebarVisible2: any = false;
  public clearFlag: boolean = false;

  public chatHistory = [
    {
      category: new Date().toISOString().split('T')[0],
      chats: [
        { chatId: 1, sender: 'User A', preview: 'Image Quality Suggestions' },
        { chatId: 2, sender: 'User B', preview: 'Caption Optimization Tips' },
        { chatId: 1, sender: 'User A', preview: 'Image Quality Suggestions' },
        { chatId: 2, sender: 'User B', preview: 'Caption Optimization Tips' },
      ]
    },
    {
      category: 'Last 7 Days',
      chats: [
        { chatId: 3, sender: 'User A', preview: 'Audio Adjustment Feedback' },
        { chatId: 4, sender: 'User B', preview: 'Scheduling Recommendations' },
        { chatId: 3, sender: 'User A', preview: 'Audio Adjustment Feedback' },
        { chatId: 4, sender: 'User B', preview: 'Scheduling Recommendations' },
      ]
    },
    {
      category: 'Last 30 Days',
      chats: [
        { chatId: 5, sender: 'User A', preview: 'Optimize Your Post Content' },
        { chatId: 6, sender: 'User B', preview: 'Improve Video and Audio Quality' },
        { chatId: 5, sender: 'User A', preview: 'Optimize Your Post Content' },
        { chatId: 6, sender: 'User B', preview: 'Improve Video and Audio Quality' }
      ]
    }
  ];


  public chatContent = [
    { chatId: 1, sender: 'lhs', message: ' the most popular post without any baby featuring in it is this https://www.instagram.com/reel/CmtjZevoCg6/?', image: './assets/images/Dummy1.png' },
    { chatId: 1, sender: 'rhs', message: 'I am good, thank you!' },
    { chatId: 2, sender: 'lhs', message: 'Hi, long time no see!' },
    { chatId: 2, sender: 'rhs', message: 'Yeah, its been a while!' },
    { chatId: 3, sender: 'lhs', message: 'Hello, how are you?' },
    { chatId: 3, sender: 'rhs', message: 'I am good, thank you!' },
    { chatId: 4, sender: 'lhs', message: 'Hi, long time no see!' },
    { chatId: 4, sender: 'rhs', message: 'Yeah, its been a while!' },
    { chatId: 5, sender: 'rhs', message: 'I am good, thank you!' },
    { chatId: 5, sender: 'lhs', message: 'Hi, long time no see!' },
    { chatId: 6, sender: 'rhs', message: 'Yeah, its been a while!' }
  ];

  ngOnInit(): void {
    this.commonService.buttonClick$.subscribe(() => {
      this.isClicked = true;
      this.sidebarVisible2 = true;
    });
  }

  constructor(private commonService: CommonService, private router: Router) { }

  public onclear(): void {
    this.sidebarVisible2 = false;
    console.log('asas');
    this.clearFlag = true;

  }
}
