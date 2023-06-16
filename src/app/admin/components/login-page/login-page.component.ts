import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  submitted: Boolean = false
 

  constructor (
    public auth: AuthService, 
    private router: Router,
    private activeRoute: ActivatedRoute){
    
  }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {      // можно не отписываться
      this.nonAuth = params['nonAuth']
      console.log('Авторизованы: ',params)
    })
    
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(6)])
    })
  }

  submit(){
    this.submitted = true
    this.auth.login(this.loginForm.value).subscribe(() => {
      this.loginForm.reset()
      this.router.navigate(['/admin','lessons'])
      this.submitted = false
    },() => {
      //если неудачно так же сбрасываем
      this.submitted = false;
    })
  }
}
