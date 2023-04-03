import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  fbDbUrl = 'https://angular-blog-c240b-default-rtdb.europe-west1.firebasedatabase.app'
  constructor(private http: HttpClient) { }

  
  getAllLessons(){
    /*** метод получения всех уроков с сервера ***/

    return this.http.get(`${this.fbDbUrl}/lesson.json`)
    .pipe(map((response:{[key: string]:any})=>{
        return Object.keys(response).map(key=>({
            ...response[key],
            id: key,
            data: new Date(response[key].date)
        }))
    }))
  }
}
