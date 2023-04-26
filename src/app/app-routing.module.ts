
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './base/components/main-layout/main-layout.component';
import { AboutComponent } from './base/components/about/about.component';
import { TestingComponent } from './base/components/testing/testing.component';
import { FeedbackComponent } from './base/components/feedback/feedback.component';
import { LoginPageComponent } from './admin/components/login-page/login-page.component';
import { ContentComponent } from './base/components/content/content.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
    {path: '', component: MainLayoutComponent, children: [
        {path: '', redirectTo: '/about', pathMatch: 'full'},
        {path: 'about', component: AboutComponent},
        {path: 'testing', component: TestingComponent, children: [
            {path: 'chapter/:id', component: ContentComponent}
        ]},
        {path: 'feedback', component: FeedbackComponent},
        {path: 'login', component: LoginPageComponent},
    ]},
    {path:'admin',  loadChildren:() => import('./admin/admin.module').then(m=>m.AdminModule)}   // используем lazyLoading
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
