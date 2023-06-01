import { LessonService } from 'src/app/services/lesson.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Lesson } from 'src/app/base/interfaces/interfaces';

@Component({
  selector: 'app-lesson-item',
  templateUrl: './lesson-item.component.html',
  styleUrls: ['./lesson-item.component.less']
})
export class LessonItemComponent implements OnInit{

  @Input()
  lesson!: Lesson
  
  @Output() 
  dataChanged:EventEmitter<any> = new EventEmitter<any>()
  
  constructor(){

  }
  onCheckboxChange(event: any){
    this.dataChanged.emit({
      msg: 'Сообщение события',
    })
    console.log('событие', event);
  }
  ngOnInit(): void {

  }

  ngOnDestroy(){

  }

}
