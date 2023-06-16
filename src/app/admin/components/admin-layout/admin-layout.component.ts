import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.less']
})
export class AdminLayoutComponent implements OnInit {

  constructor(private auth: AuthService){
    
  }
  
  ngOnInit(): void {
    
  }

  logout(){
    this.auth.logout()
  }

}
