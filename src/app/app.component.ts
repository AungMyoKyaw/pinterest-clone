import { Component } from '@angular/core';
import { AppService } from './app.service';
import { MdDialog,MdDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { NewImageComponent } from './new-image/new-image.component'

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
  dialogRef:MdDialogRef<NewImageComponent>;

  constructor(
    private app:AppService,
    private router:Router,
    public dialog:MdDialog
  ){}

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

  addNewImage(){
    this.dialogRef = this.dialog.open(NewImageComponent,{
      width:'80%'
    });
    this.dialogRef.componentInstance.isAuth = this.auth;
    this.dialogRef.afterClosed().subscribe(result=>{
      if(result !== undefined){
        this.router.navigateByUrl('/amk',{skipLocationChange:true})
        .then(()=>{
          this.router.navigateByUrl('home')
        })
      }
    })
  }

  ngOnInit(){
    this.isAuth();
  }
}
