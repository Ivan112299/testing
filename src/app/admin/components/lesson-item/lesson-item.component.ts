import { LessonService } from 'src/app/services/lesson.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Lesson } from 'src/app/base/interfaces/interfaces';
import { Subject, map, mergeMap, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-lesson-item',
  templateUrl: './lesson-item.component.html',
  styleUrls: ['./lesson-item.component.less']
})
export class LessonItemComponent implements OnInit{

  @Input()
  lesson!: Lesson
  @Output() 
  dataChanged:EventEmitter<any> = new EventEmitter<any> ()
  @Output() 
  dataNotChanged:EventEmitter<any> = new EventEmitter<any> ()
  
  isArchived!: boolean 
  readonly destroyed$ = new Subject();

  constructor( private lessonService: LessonService,){

  }
  onCheckboxChange(event: any){

    // ставим флаг, что урок удален
    const lessonForUpdate = {
      ...this.lesson,
      isDelete: this.isArchived
    }

    this.lessonService.updateLesson(lessonForUpdate, this.lesson.id!)
    .pipe(
      take(1),
      takeUntil(this.destroyed$))
    .subscribe(
      { 
        next:()=> {
          this.dataChanged.emit(lessonForUpdate.title)
        }, 
        error: () => {
          this.dataNotChanged.emit('Ошибка при обновлении данных')
        }
      })

    // ставим флаг соответствующему разделу
    this.lessonService.getAllChapters()
    .pipe(
      take(1),
      takeUntil(this.destroyed$),
      mergeMap((chapters) => {
        let filteredChapters = chapters.filter(chapter => chapter.idLesson === this.lesson.id)
        let chapterForUpdate = {
          ...filteredChapters[0],
          isDelete: this.isArchived
        }
        return this.lessonService.updateChapter(chapterForUpdate, chapterForUpdate.id)
      })
      )
    .subscribe()
  }

  ngOnInit(): void {
    this.isArchived = this.lesson?.isDelete || false;
  }

  ngOnDestroy(){
    this.destroyed$.next('')
    this.destroyed$.complete()
  }

}
