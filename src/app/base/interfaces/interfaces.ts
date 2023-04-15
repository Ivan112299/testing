export interface Lesson {
    author: string
    id?: number
    text: string
    title: string
}

export interface Chapter {
    id: string ,
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