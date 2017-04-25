import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { AppService } from '../app.service';

@Component({
  selector: 'app-new-image',
  templateUrl: './new-image.component.html',
  styleUrls: ['./new-image.component.css'],
  providers: [AppService]
})
export class NewImageComponent implements OnInit {
  imageUrl:string = "http://placehold.it/350x100?text=Pinterest+Clone";
  imgDes:string;
  isImgOk:boolean;
  loading:boolean;
  isAuth:boolean;

  constructor(
    public dialogRef:MdDialogRef<NewImageComponent>,
    private app:AppService
  ) { }

  onchangeHandler(imgUrl){
    let isUrl = /^https?:\/\//.test(imgUrl);
    let url = isUrl ? imgUrl : 'http://localhost';
    console.log('amk');
    this.app.isImgBroken(imgUrl)
      .subscribe(res=>{
        this.imageUrl = isUrl ? imgUrl : "http://placehold.it/350x100?text=Your+image+link+is+broken!";
      },err=>{
        this.imageUrl = "http://placehold.it/350x100?text=Your+image+link+is+broken!";
      })
  }

  newImage(url,des){
    let body = {url:url,description:des};
    this.loading = true;
    this.app.newImage(body)
      .subscribe(res=>{
        if(body.url || body.description){
          this.loading = false;
          this.dialogRef.close('posted');
        } else {
          this.loading = true;
          this.dialogRef.close(undefined);
        }
      },err=>{
        this.loading = false;
      })
  }

  ngOnInit() {
  }

}
