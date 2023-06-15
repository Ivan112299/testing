import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventEmitter, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { CreateComponent } from './components/create/create.component';
import { LessonsComponent } from './components/lessons/lessons.component';
import { AuthGuard } from '../services/auth.guard';
import { NgxEditorModule } from 'ngx-editor';
import { EditComponent } from './components/edit/edit.component';
import { LessonItemComponent } from './components/lesson-item/lesson-item.component';
import { AlertComponent } from '../shared/alert/alert.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    CreateComponent,
    LessonsComponent,
    LessonItemComponent,
    EditComponent,
    AlertComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NgxEditorModule.forRoot(),
    RouterModule.forChild([
      {path: '', component: AdminLayoutComponent, children:[
        {path: '', redirectTo: '/admin/login/', pathMatch: 'full'},
        {path: 'login', component: LoginPageComponent},
        {path: 'create', canActivate: [AuthGuard], component: CreateComponent},
        {path: 'lessons', canActivate: [AuthGuard], component: LessonsComponent},
        {path: 'lesson/:id', canActivate: [AuthGuard], component: EditComponent}
    ]}
]),
  ],
  providers:[
    AuthGuard
  ]
})
export class AdminModule { }
