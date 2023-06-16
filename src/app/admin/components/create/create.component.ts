import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Editor, Toolbar } from 'ngx-editor';
import { Subject, mergeMap, take, takeUntil } from 'rxjs';
import { Chapter, Lesson } from 'src/app/base/interfaces/interfaces';
import { LessonService } from 'src/app/services/lesson.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less']
})
export class CreateComponent implements OnInit {
  
  readonly destroyed$ = new Subject();
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

  constructor(
    private lessonService: LessonService
    ){

  }
  formCreateLesson!: FormGroup

  ngOnInit(): void {
    this.editor = new Editor();
    this.formCreateLesson = new FormGroup({
     text: new FormControl('', Validators.required),
      title: new FormControl(null, Validators.required)
    })
  }

  submit(){
    let formData = this.formCreateLesson.value
    this.lesson  = {
      ...formData,
      date: new Date(),
      author: 'Текущий пользователь'
    }

    this.lessonService.addLesson(this.lesson)
    .pipe(
      mergeMap((les) =>{
        this.chapter  = {
              idLesson: les.name,
              title: this.lesson.title
            }
        return this.lessonService.addChapter(this.chapter)
      }),
      take(1),
      takeUntil(this.destroyed$)
    )
    .subscribe(response =>
        console.log('итоговый респ', response?.name)
      )
    this.formCreateLesson.reset()
  }

  ngOnDestroy() {
    
    this.destroyed$.next('');
    this.destroyed$.complete();
    this.editor.destroy();
  }
}
