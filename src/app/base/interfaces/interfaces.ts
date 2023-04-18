export interface Lesson {
    author: string
    id?: number
    text: string
    title: string
    isDelete?: string
}

export interface Chapter {
    idLesson: string ,
    title: string
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