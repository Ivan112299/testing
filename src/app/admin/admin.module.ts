import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { CreateComponent } from './components/create/create.component';
import { LessonsComponent } from './components/lessons/lessons.component';
import { AuthGuard } from '../services/auth.guard';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    CreateComponent,
    LessonsComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    
    RouterModule.forChild([
      
      {path: '', component: AdminLayoutComponent, children:[
        {path: '', redirectTo: '/admin/login/', pathMatch: 'full'},
        {path: 'login', component: LoginPageComponent},
        {path: 'create', canActivate: [AuthGuard], component: CreateComponent},
        {path: 'lessons', canActivate: [AuthGuard], component: LessonsComponent},
    ]}
]),
  ],
  providers:[
    AuthGuard
  ]
})
export class AdminModule { }
