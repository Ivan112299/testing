import { Chapter, Lesson, fbCreateResponse, fbUpdateResponse } from './../base/interfaces/interfaces';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  fbDbUrl = 'https://testing-4da51-default-rtdb.firebaseio.com'
  constructor(
    private http: HttpClient
    ) {}

  
  getAllLessons(){
    /*** метод получения всех уроков с сервера ***/

    return this.http.get(`${this.fbDbUrl}/lessons.json`)
    .pipe(map((response:{[key: string]:any})=>{
        return Object.keys(response).map(key=>({
            ...response[key],
            id: key
        }))
    }))
  }

  getAllChapters(){
    /*** метод получения списка всех разделов ***/

    return this.http.get(`${this.fbDbUrl}/chapters.json`)
    .pipe(map((response:{[key: string]:any})=>{
        return Object.keys(response).map(key=>({
            ...response[key],
            id: key
        }))
    }))
  }

  getLesson(id: string){
    /*** метод получения раздела по id ***/

    return this.http.get(`${this.fbDbUrl}/lessons/${id}.json`)
    .pipe(map((response: any)=>{
        let lesson = {
          ...response,
          id
        }
        return lesson as Lesson
    }))
  }

  getChapterByLessonId(idLesson: string){
    /*** метод получения списка всех разделов ***/

    return this.http.get(`${this.fbDbUrl}/chapters.json/?orderBy="idLesson"&equalTo="${idLesson}"`)
    .pipe(map((response:any)=>{
        const id = Object.keys(response)[0]
        let chapter = {
          ...response[id],
          id
        }
        return chapter as Chapter
    }))
  }

  addLesson(body: Lesson){
    /*** метод добавления урока ***/

    return this.http.post(`${this.fbDbUrl}/lessons.json`, body)
    .pipe(map((response)=>{
        return response as fbCreateResponse
    }))
  }

  addChapter(body: Chapter){
    /*** метод добавления раздела под урок ***/

    return this.http.post(`${this.fbDbUrl}/chapters.json`, body)
    .pipe(map((response)=>{
        return response as fbCreateResponse
    }))
  }

  updateLesson(body: Lesson, id: string){
    /*** метод обновления содержания урока ***/

    return this.http.put(`${this.fbDbUrl}/lessons/${id}.json`, body)
    .pipe(map((response)=>{
        return response as fbUpdateResponse
    }))
  }

  updateChapter(body: Chapter, id: string = 'test'){
    /*** метод обновления раздела ***/

    return this.http.put(`${this.fbDbUrl}/chapters/${id}.json`, body)
    .pipe(map((response)=>{
        return response 
    }))
  }
}
