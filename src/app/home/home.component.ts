import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { MasonryOptions } from 'angular2-masonry';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[AppService]
})
export class HomeComponent implements OnInit {
  errMessage = '';
  topStories = [];
  loading = true;
  public myoptions:MasonryOptions = {
    gutter:10,
    fitWidth:true
  }

  constructor(private app:AppService) { }

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

  ngOnInit() {
    this.newFeed();
  }
}
