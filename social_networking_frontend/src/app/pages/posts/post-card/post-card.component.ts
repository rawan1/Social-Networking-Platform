import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { post } from '../../../models/post.model';
import { ImgUrlPipe } from '../../../pipes/img-url.pipe';
import { CommentsListComponent } from '../../comments/comments-list/comments-list.component';
import { Router } from '@angular/router';
import { PostsService } from '../../../services/posts.service';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule, ImgUrlPipe, CommentsListComponent],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css'
})
export class PostCardComponent implements OnInit {
  @Input()
  post!: post;
  showComments: boolean = false;

  constructor(private route: Router, private postService: PostsService) { }
  ngOnInit(): void {
    console.log(this.post)
  }


  likePressed() {

  }
  commentPressed() {
    this.showComments = true;
  }
  editPost() {
    this.route.navigateByUrl(`/posts/edit/${this.post.id}`)
  }
  deletePost() {
    if (this.post.id && confirm('are you sure'))
      this.postService.deletePost(this.post.id).subscribe(() => {
        window.location.reload();
      });
  }
}

