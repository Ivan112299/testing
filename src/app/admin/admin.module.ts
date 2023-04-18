import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { CreateComponent } from './components/create/create.component';
import { LessonsComponent } from './components/lessons/lessons.component';
import { AuthGuard } from '../services/auth.guard';
import { NgxEditorModule } from 'ngx-editor';

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
    NgxEditorModule.forRoot({
      locals: {
        // menu
        bold: 'Bold',
        italic: 'Italic',
        code: 'Code',
        underline: 'Underline',
        strike: 'Strike',
        blockquote: 'Blockquote',
        bullet_list: 'Bullet List',
        ordered_list: 'Ordered List',
        heading: 'Heading',
        h1: 'Header 1',
        h2: 'Header 2',
        h3: 'Header 3',
        h4: 'Header 4',
        h5: 'Header 5',
        h6: 'Header 6',
        align_left: 'Left Align',
        align_center: 'Center Align',
        align_right: 'Right Align',
        align_justify: 'Justify',
        text_color: 'Text Color',
        background_color: 'Background Color',
        insertLink: 'Insert Link',
        removeLink: 'Remove Link',
        insertImage: 'Insert Image',

        // pupups, forms, others...
        url: 'URL',
        text: 'Text',
        openInNewTab: 'Open in new tab',
        insert: 'Insert',
        altText: 'Alt Text',
        title: 'Title',
        remove: 'Remove',
      },
    }),
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
