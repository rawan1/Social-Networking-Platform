import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  backendUrl = environment.apiUrl + 'comments/';

  constructor(private http: HttpClient) { }

  addComment(postId: number, comment: string) {
    return this.http.post(this.backendUrl + `addComment/${postId}`, { text: comment });
  }
  getAllComments(postId: number): Observable<any[]> {
    return this.http.get< any[] []>(this.backendUrl + `postComments/${postId}`);
  }
}
