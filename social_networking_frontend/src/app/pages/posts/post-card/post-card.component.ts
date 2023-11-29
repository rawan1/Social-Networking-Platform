import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { post } from '../../../models/post.model';
import { ImgUrlPipe } from '../../../pipes/img-url.pipe';
import { AddCommentComponent } from '../../comments/add-comment/add-comment.component';
import { CommentsListComponent } from '../../comments/comments-list/comments-list.component';

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

  ngOnInit(): void {
    console.log(this.post)
  }


  likePressed() {

  }
  commentPressed() {
    this.showComments = true;
  }
}

