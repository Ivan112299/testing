import { LessonService } from 'src/app/services/lesson.service';
import { Component, OnInit } from '@angular/core';
import { Lesson } from 'src/app/base/interfaces/interfaces';
import { Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.less']
})
export class LessonsComponent implements OnInit{

  lessons: Lesson[] = []
  editedLessonTitle = ''
  viewAlertSuccess = false
  viewAlertErr = false

  readonly destroyed$ = new Subject();
  
  constructor(
    private lessonService: LessonService
  ){

  }
  ngOnInit(): void {
    this.lessonService.getAllLessons()
    .pipe(
      take(1),
      takeUntil(this.destroyed$)
    )
    .subscribe((lessons) => {
      this.lessons = lessons
    })
  }
  dataChangedHandler(lessonName:any){
    this.editedLessonTitle = `Урок ${lessonName} обновлен`
    this.viewAlertSuccess = true
  
  }

  dataNotChangedHandler(){
    this.viewAlertErr = true
  }

  ngOnDestroy(){
    this.lessons = []
    this.destroyed$.next('')
    this.destroyed$.complete()
  }

}
