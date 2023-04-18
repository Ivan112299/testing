import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { AboutComponent } from './components/about/about.component';
import { TestingComponent } from './components/testing/testing.component';
import { ChaptersComponent } from './components/chapters/chapters.component';
import { ContentComponent } from './components/content/content.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    MainLayoutComponent,
    AboutComponent,
    TestingComponent,
    ChaptersComponent,
    ContentComponent,
    FeedbackComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule 
  ]
})
export class BaseModule { }
