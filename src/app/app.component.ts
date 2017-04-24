import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[AppService]

})

export class AppComponent {
  title = 'Pinterest Clone';
  auth = false;
  errMessage = '';
  userName:string;

  constructor(private app:AppService){}

  isAuth(){
    this.app.isAuth()
      .subscribe(result=>{
        this.auth = true;
        this.userName = result.username;
      },err=>{
        this.auth = false;
        this.errMessage = 'err';
      })
  }

  logout(){
    this.app.logout()
      .subscribe(result=>{
        this.auth = false;
      },err=>{
        this.auth = true;
      })
  }

  ngOnInit(){
    this.isAuth();
  }
}
