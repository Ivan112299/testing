import { Chapter } from './../../interfaces/interfaces';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Route, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { LessonService } from 'src/app/services/lesson.service';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.less']
})
export class ChaptersComponent implements OnInit{
  
  chapters$: Subscription | undefined
  chapters: Chapter[] = [
  ]
  
  @Output()
  chapterId: EventEmitter<Number> = new EventEmitter<Number>()

  constructor(
    private lessonService: LessonService,
    private router: ActivatedRoute
  ){}
  getChapterId(id: String){

  }
  ngOnInit(): void {
    this.chapters$ = this.lessonService.getAllChapters().subscribe(
      (lessons) => {
        this.chapters = lessons
      }
    )
  }
  
  ngOnDestroy(){
    this.chapters$?.unsubscribe()
  }

}
