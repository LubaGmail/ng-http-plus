import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash'; 
import { PostService} from '../services/post.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

const apiUrl = "https://jsonplaceholder.typicode.com/posts";

interface Post {
  userId: number;
  id: number;
  title: string;
  isRead: boolean;
  body: string;
}

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[];

  constructor(private postService: PostService) {
  }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.postService.getPosts().subscribe((res: Post[]) => {
      this.posts = res;
    });
  }

  createPost(title: HTMLInputElement) {
    this.postService.createPost(title).subscribe((res: Post[]) => {
      let post: any = res;
      post.title = title.value;
      this.posts.splice(0, 0, post);
    }); 
  }

  patchPost(post) {
    let index = this.posts.indexOf(post);
    post.isRead = true;
    this.postService.patchPost(post).subscribe((res: Post[]) => {
      this.posts.splice(index,1,post);
      // console.log(this.posts[index]);
    })
  }

  putPost(post) {
    const index = this.posts.indexOf(post);
    this.postService.putPost(post).subscribe((res: Post[]) => {
      let post:any = res;
      post.title = 'updated';
      this.posts.splice(index, 0, post);
    })
  }

  deletePost(post) {
    const index = this.posts.indexOf(post);
    this.postService.deletePost(post).subscribe( (res) => {
      this.posts.splice(index, 1);
    });
  }

}
