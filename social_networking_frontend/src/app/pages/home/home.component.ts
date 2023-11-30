import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsService } from '../../services/posts.service';
import { Observable, filter, map } from 'rxjs';
import { post } from '../../models/post.model';
import { PostCardComponent } from '../posts/post-card/post-card.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PostCardComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private postService: PostsService) { }

  posts: Observable<Array<post>> | undefined;
  ngOnInit(): void {
    this.posts = this.postService.getAllPosts().pipe(map(response => response.data));
  }
}
