import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { MasonryOptions } from 'angular2-masonry';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers:[AppService]
})
export class UserProfileComponent implements OnInit,OnDestroy {
  username:string;
  private sub:any;
  topStories = [];
  loading = true;
  errMessage = '';
  public myoptions:MasonryOptions = {
    gutter:10,
    fitWidth:true
  }

  constructor(private route:ActivatedRoute,private app:AppService) { }

  newFeed(userName){
    this.app.userProfile(userName)
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
    this.sub = this.route.params.subscribe(params=>{
      console.log(params.username);
      this.newFeed(params.username);
    })
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
