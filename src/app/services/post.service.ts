import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const apiUrl = "https://jsonplaceholder.typicode.com/posts"

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get(apiUrl);
  }

  createPost(title: HTMLInputElement) {
    return this.http.post(apiUrl, JSON.stringify(title.value));
  }

  patchPost(post) {
    return  this.http.patch(apiUrl + '/' + post.id, JSON.stringify({ isRead: true }));
  }

  putPost(post) {
    return this.http.put(apiUrl + '/' + post.id, JSON.stringify(post));
  }

  deletePost(post) {
    return this.http.delete(apiUrl + '/' + post.id);
  }
  
}
