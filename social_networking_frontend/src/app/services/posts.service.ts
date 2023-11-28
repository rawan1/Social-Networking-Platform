import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { post } from '../models/post.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  backendUrl = environment.apiUrl + 'posts';
  constructor(private http: HttpClient) { }

  createPost(payload: any) {
    return this.http.post(this.backendUrl + '/createPost', payload);
  }
  
  editPost(payload: any, postId: number) {
    return this.http.put(this.backendUrl + `/updatePost/${postId}`, payload);
  }

  deletePost(postId: number) {
    return this.http.delete(this.backendUrl + `/deletePost/${postId}`);
  }
  getAllPosts() {
    return this.http.get(this.backendUrl + '?limit=20');
  }
  getPostById(postId: number): Observable<{data: post}> {
    return this.http.get<{data: post}>(this.backendUrl + `/getPost/${postId}`);
  }
  searchforPosts(searchTerm: string) {
    return this.http.get(this.backendUrl + `?searchTerm=${searchTerm}`);
  }

}
