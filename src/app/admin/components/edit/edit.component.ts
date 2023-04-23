import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { Editor, Toolbar } from 'ngx-editor';
import { take } from 'rxjs';
import { Chapter, Lesson } from 'src/app/base/interfaces/interfaces';
import { LessonService } from 'src/app/services/lesson.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less']
})
export class EditComponent {

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
  lesson!: Lesson
  chapter!: Chapter
  currentLessonId!: string
  jsonDoc!: any

  constructor(
    private lessonService: LessonService,
    private activatedRouter: ActivatedRoute,
    private router: Router
    ){

  }
  formEditLesson!: FormGroup

  ngOnInit(): void {
    // получаю id урока из адресной строки
    this.activatedRouter.params.subscribe(
      (params: Params) => {
        this.currentLessonId  = params['id']
      }
    )

    // запрашиваю этот урок
    this.lessonService.getLesson(this.currentLessonId).subscribe(
      lesson => {
        this.lesson = lesson
        
        this.editor = new Editor();
        this.formEditLesson = new FormGroup({
          text: new FormControl(lesson.text, Validators.required),
          title: new FormControl(this.lesson?.title, Validators.required)
        })
      } 
    )
    
  }
  ngOnDestroy(): void {
    this.editor.destroy();
  }

  submit(){
    console.log('Вызов самита')
    let formData = this.formEditLesson.value
    this.lesson  = {
      ...formData,
      date: new Date(),
      author: 'Текущий пользователь'
    }
    this.lessonService.updateLesson(this.lesson, this.currentLessonId)
    .pipe(take(1))
    .subscribe(response =>
        console.log('итоговый респ', response)
      )
  }

  toArchive(){
    this.lesson.isDelete = true
    this.lessonService.updateLesson(this.lesson, this.currentLessonId)
    .pipe(take(1))
    .subscribe(response =>{
        this.router.navigate(['/admin','lessons'])
        console.log('итоговый респ', response)
      }
    )
  }

  removeFromArchive(){
    this.lesson.isDelete = false
    this.lessonService.updateLesson(this.lesson, this.currentLessonId)
    .pipe(take(1))
    .subscribe(response =>{
        console.log('итоговый респ', response)
      }
    )
  }
}
