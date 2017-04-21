import { Component } from '@angular/core';
import { AppService } from './app.service';
import { MasonryOptions } from 'angular2-masonry';

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
  topStories = [];
  loading = true;
  public myoptions:MasonryOptions = {
    gutter:10,
    fitWidth:true
  }

  constructor(private app:AppService){}

  newFeed(){
    this.app.newFeed()
      .subscribe(result=>{
        this.topStories = result;
        this.loading = false
        console.log(this.topStories);
      },err=>{
        this.errMessage = err.message;
      })
  }

  like(story){
    let curIndex = this.topStories.indexOf(story);
    this.topStories[curIndex].loading = true;
    this.app.like({imageId:story._id})
      .subscribe(result=>{
        console.log(result);
        this.topStories[curIndex].liked = !story.liked;
        this.topStories[curIndex].loading = false;
      },err=>{
        this.topStories[curIndex].loading = false;
        this.errMessage = err.message;
      })
  }

  isAuth(){
    this.app.isAuth()
      .subscribe(result=>{
        this.auth = true;
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
    this.newFeed();
  }
}
