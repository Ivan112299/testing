import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less']
})
export class CreateComponent implements OnInit {
  constructor(){

  }
  formCreateLesson!: FormGroup

  ngOnInit(): void {
    this.formCreateLesson = new FormGroup({
      title: new FormControl(null, Validators.required)

    })
  }

  submit(){
    console.log(this.formCreateLesson.get('genre'))
    console.log('собираем данные');
    let formData = this.formCreateLesson.value
    console.log(formData)
    this.formCreateLesson.reset()
  }
}
