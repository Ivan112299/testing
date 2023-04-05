import { Lesson } from './../base/interfaces/interfaces';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  fbDbUrl = 'https://testing-4da51-default-rtdb.firebaseio.com'
  constructor(private http: HttpClient) { }

  
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
            ...response[key]
        }))
    }))
  }

  getLesson(id: string){
    /*** метод получения списка всех разделов ***/

    return this.http.get(`${this.fbDbUrl}/lessons/${id}.json`)
    .pipe(map((response)=>{
        return response as Lesson
    }))
  }
}
