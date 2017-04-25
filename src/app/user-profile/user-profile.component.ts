import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
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
  showRemove:boolean = false;
  public myoptions:MasonryOptions = {
    gutter:10,
    fitWidth:true
  }

  constructor(
    private route:ActivatedRoute,
    private app:AppService,
    private router:Router
  ) { }

  newFeed(userName){
    this.app.userProfile(userName)
      .subscribe(result=>{
        this.topStories = result;
        this.loading = false
      },err=>{
        this.errMessage = err.message;
        this.router.navigate(['profile/404']);
      })
  }

  like(story){
    let curIndex = this.topStories.indexOf(story);
    this.topStories[curIndex].loading = true;
    this.app.like({imageId:story._id})
      .subscribe(result=>{
        this.topStories[curIndex].liked = !story.liked;
        this.topStories[curIndex].loading = false;
      },err=>{
        this.topStories[curIndex].loading = false;
        this.errMessage = err.message;
      })
  }

  delImage(story){
    let curIndex = this.topStories.indexOf(story);
    this.topStories[curIndex].loading = true;
    this.app.delImage(story._id)
      .subscribe(retult=>{
        this.topStories[curIndex].loading = false;
        this.topStories.splice(curIndex,1);
      },err=>{
        this.topStories[curIndex].loading = false;
        this.errMessage = err.message;
      })
  }

  isAuth(){
    this.app.isAuth()
      .subscribe(result=>{
        this.showRemove = result.username == this.username;
      })
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params=>{
      this.username = params.username;
      this.isAuth();
      this.newFeed(params.username);
    })
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
