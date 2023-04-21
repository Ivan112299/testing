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

  constructor(
    private lessonService: LessonService
  ){

  }
  ngOnInit(): void {
    this.lessonService.getAllLessons()
    .subscribe((lessons) => {
     
      this.lessons = lessons
      console.log(this.lessons)
    })
  }

}
