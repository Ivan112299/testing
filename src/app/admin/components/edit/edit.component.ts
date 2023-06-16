import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { Editor, Toolbar } from 'ngx-editor';
import { take, mergeMap, Subject, takeUntil } from 'rxjs';
import { Chapter, Lesson } from 'src/app/base/interfaces/interfaces';
import { LessonService } from 'src/app/services/lesson.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less']
})
export class EditComponent {
  
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
  currentLessonId!: string
  jsonDoc!: any
  viewAlertSuccess = false
  viewAlertErr = false
  textAlert = ''

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

    // запрашиваю раздел смапленный с этим уроком
    this.lessonService.getChapterByLessonId(this.currentLessonId)
    .subscribe(chapter => {
      this.chapter = chapter
    })

   
  }

  submit(){
    let formData = this.formEditLesson.value
    this.lesson  = {
      ...formData,
      date: new Date(),
      author: 'Текущий пользователь'
    }
    this.lessonService.updateLesson(this.lesson, this.currentLessonId)
    .pipe(
      take(1),
      takeUntil(this.destroyed$))
    .subscribe({
      next:(()=>{
        this.viewAlertSuccess = true
        this.textAlert = 'Успешно обновлен'
      }), error: ((err)=>{
        this.viewAlertErr = true
        this.textAlert = err.message
        console.log('err', err)
      })
  })
  }

  toArchive(){
    this.lesson.isDelete = true
    
    // ставим флаг, что урок удален
    this.lessonService.updateLesson(this.lesson, this.currentLessonId)
    .pipe(
      take(1),
      takeUntil(this.destroyed$))
    .subscribe(() =>{
        this.router.navigate(['/admin','lessons'])
      }
    )
    // ставим isDelete  разделу
    this.lessonService.getAllChapters()
    .pipe(
      take(1),
      takeUntil(this.destroyed$),
      mergeMap((chapters) => {
        let filteredChapters = chapters.filter(chapter => chapter.idLesson === this.lesson.id)
        let chapterForUpdate = {
          ...filteredChapters[0],
          isDelete: true
        }
        return this.lessonService.updateChapter(chapterForUpdate, chapterForUpdate.id)
      })
      )
    .subscribe()
  }

  removeFromArchive(){
    this.lesson.isDelete = false
    let chapterForUpdate = {
      ...this.chapter,
      isDelete: false
    }

    this.lessonService.updateLesson(this.lesson, this.currentLessonId)
    .pipe(take(1),takeUntil(this.destroyed$))
    .subscribe()

    this.lessonService.updateChapter(chapterForUpdate, chapterForUpdate.id)
    .pipe(take(1),takeUntil(this.destroyed$))
    .subscribe()
  }

  ngOnDestroy() {
    this.destroyed$.next('');
    this.destroyed$.complete();
    this.editor.destroy();
  }
}
