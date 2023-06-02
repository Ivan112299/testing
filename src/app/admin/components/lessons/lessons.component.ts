import { LessonService } from 'src/app/services/lesson.service';
import { Component, OnInit } from '@angular/core';
import { Lesson } from 'src/app/base/interfaces/interfaces';

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
  constructor(
    private lessonService: LessonService
  ){

  }
  ngOnInit(): void {
    this.lessonService.getAllLessons()
    .subscribe((lessons) => {
      this.lessons = lessons
    })
  }
  dataChangedHandler(lessonName:any){
    this.editedLessonTitle = lessonName
    this.viewAlertSuccess = true
    setTimeout(()=>{
      this.viewAlertSuccess = false
    }, 3000)
  }

  dataNotChangedHandler(){
    this.viewAlertErr = true
    setTimeout(()=>{
      this.viewAlertErr = false
    }, 3000)
  }

  ngOnDestroy(){
    this.lessons = []
  }

}
