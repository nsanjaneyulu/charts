import { Routes } from '@angular/router';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { CotentTestingComponent } from './features/sybyl-insights/content-testing/cotent-testing.component';
import { SocialOverviewComponent } from './features/sybyl-insights/social-overview/social-overview.component';
import { AppComponent } from './app.component';

export const routes: Routes = [      
  
  {
  path: 'socialOverview',
  loadComponent: () =>
    import('./features/sybyl-insights/social-overview/social-overview.component').then(
      (m) => m.SocialOverviewComponent
    ),
  
  data: { breadcrumb: 'Social OverView' },
  title: 'Social Overview',
  
  },
   
  {
    path: 'home',
    loadComponent: () =>
      import('./features/landing-page/landing-page.component').then(
        (m) => m.LandingPageComponent
      ),
    
    data: { breadcrumb: 'Home' },
    title: 'Home',
    
    },
  {
    path: 'contentTesting',
    loadComponent: () =>
      import('./features/sybyl-insights/content-testing/cotent-testing.component').then(
        (m) => m.CotentTestingComponent
      ),
    data: { breadcrumb: 'Content Testing' },
    title: 'Content Testing',
    children: [{
      path: 'result',
      loadComponent: () =>
        import('./features/sybyl-insights/content-testing/content-testing-results/content-testing-results.component').then(
          (m) => m.CotentTestingResultsComponent
        ),
      data: { breadcrumb: 'Results' },
    },]
    },
  
    {
      path: 'contentInsight',
      loadComponent: () =>
        import('./features/sybyl-insights/cotent-insights/cotent-insights.component').then(
          (m) => m.CotentInsightsComponent
        ),
      data: { breadcrumb: 'Content Insight' },
      title: 'Content Insight',
     
      },
  
      {
        path: 'SetimentAnalysis',
        loadComponent: () =>
          import('./features/sybyl-insights/sentiment-analysis/sentiment-analysis.component').then(
            (m) => m.SentimentAnalysisComponent
          ),
        data: { breadcrumb: 'Sentiment Analysis' },
        title: 'Sentiment Analysis',
       
        },
  
        {
          path: 'campaignPlanner',
          loadComponent: () =>
            import('./features/sybyl-insights/campaign-planner/campaign-planner.component').then(
              (m) => m.CampaignPlannerComponent
            ),
          data: { breadcrumb: 'Campaign Planner' },
          title: 'Campaign Planner',
         
          },
  {
  path: 'notfound', component: NotFoundComponent,
  },
  
  { path: '**', redirectTo: '/contentTesting' ,pathMatch: 'full' }
  ,
  
  { path: '', redirectTo: '/contentTesting' ,pathMatch: 'full' }];
