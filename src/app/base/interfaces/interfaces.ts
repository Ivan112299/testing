export interface Lesson {
    author: string
    id?: number
    text: string
    title: string
    isDelete?: boolean
}

export interface Chapter {
    id?:string ,
    idLesson: string ,
    title: string,
    isDelete?: boolean
}

export interface User {
    email: string, 
    password: string,
    returnSecureToken?: boolean
}
export interface fbAuthResponse {
    idToken: string,
    expiresIn: Number
}

export interface fbCreateResponse {
   name: string
}

export interface fbUpdateResponse {
   name: string
}