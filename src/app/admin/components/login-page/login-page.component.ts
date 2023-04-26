import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Route, Router, Params, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.less']
})
export class LoginPageComponent implements OnInit {

  loginForm!: FormGroup
  nonAuth!: Boolean
 

  constructor (
    private auth: AuthService, 
    private router: Router,
    private activeRoute: ActivatedRoute){
    
  }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      this.nonAuth = params['nonAuth']
      console.log('Авторизованы: ',params)
    })
    
    this.loginForm = new FormGroup({
      email: new FormControl('test@gmail.com'),
      password: new FormControl('123456')
    })
  }

  submit(){
    console.log(this.loginForm.value)

    this.auth.login(this.loginForm.value).subscribe(() => {
      this.loginForm.reset()
      this.router.navigate(['/admin','lessons'])
    })
  }
}
