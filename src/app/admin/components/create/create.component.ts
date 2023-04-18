import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Editor, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less']
})
export class CreateComponent implements OnInit {

  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  html!: '';

  constructor(){

  }
  formCreateLesson!: FormGroup

  ngOnInit(): void {
    this.editor = new Editor();
    this.formCreateLesson = new FormGroup({
     text: new FormControl('', Validators.required),
      title: new FormControl(null, Validators.required)
    })
  }
  ngOnDestroy(): void {
    this.editor.destroy();
  }

  submit(){
    console.log(this.formCreateLesson.get('genre'))
    console.log('собираем данные');
    let formData = this.formCreateLesson.value
    console.log(formData)
    this.formCreateLesson.reset()
  }
}
