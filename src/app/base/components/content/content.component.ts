import { LessonService } from './../../../services/lesson.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Chapter, Lesson } from '../../interfaces/interfaces';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.less']
})


export class ContentComponent implements OnInit {

  currentPostId!: string
  currentChapter: Lesson | undefined
  routeParam$: Subscription | undefined
  currentChapter$: Subscription | undefined

  constructor(
    private route: ActivatedRoute,
    private lessonService: LessonService
    ){}

  ngOnInit(): void {
    this.routeParam$ = this.route.params.subscribe((params: Params) =>{      
      this.currentPostId = params['id']
      console.log('curId',this.currentPostId)
      this.currentChapter$ = this.lessonService.getLesson(this.currentPostId).subscribe((lesson) =>{
        this.currentChapter = lesson
      })
    })
   
  }
  ngOnChange(){
    
  }
  ngOnDestroy(){
    this.routeParam$?.unsubscribe()
    this.currentChapter$?.unsubscribe()
  }

}
