import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Route } from '@angular/router';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.less']
})
export class ChaptersComponent implements OnInit{

  chapters = [
    {name: 'Раздел 1', id: 1, text: 'Test1'},
    {name: 'Раздел 2', id: 2, text: 'Test2'},
    {name: 'Раздел 3', id: 3, text: 'Test3'},
    {name: 'Раздел 4', id: 4, text: 'Test4'},
  ]
  
  @Output()
  chapterId: EventEmitter<Number> = new EventEmitter<Number>()

  constructor(){

  }
  getChapterId(id: Number){
    this.chapterId.emit(id)
    console.log('chapterId', this.chapterId)
  }
  ngOnInit(): void {
  }

}
