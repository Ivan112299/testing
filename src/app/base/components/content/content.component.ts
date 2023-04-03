import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Chapter } from '../../interfaces/interfaces';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.less']
})


export class ContentComponent implements OnInit {

  @Input()
  chapterId: Number | undefined

  currentPostId!: string
  chapters: Chapter[] = [
    {name: 'Раздел 1', id: 1, text: 'Test1'},
    {name: 'Раздел 2', id: 2, text: 'Test2'},
    {name: 'Раздел 3', id: 3, text: 'Test3'},
    {name: 'Раздел 4', id: 4, text: 'Test4'},
  ]
  currentChapter: Chapter | undefined

  constructor(
    private route: ActivatedRoute
    ){}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) =>{    
      
      this.currentPostId = params['id']
      console.log('sdfasdfa', this.currentPostId);
    }) 
    this.currentChapter = this.chapters.find(chapter => chapter.id == Number(this.currentPostId))

  }

  ngOnChange(){
    
  }

}
