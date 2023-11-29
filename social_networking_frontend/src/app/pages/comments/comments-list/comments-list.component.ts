import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCommentComponent } from '../add-comment/add-comment.component';
import { CommentsService } from '../../../services/comments.service';
import { Subscription, map } from 'rxjs';

@Component({
  selector: 'app-comments-list',
  standalone: true,
  imports: [CommonModule, AddCommentComponent],
  templateUrl: './comments-list.component.html',
  styleUrl: './comments-list.component.css'
})
export class CommentsListComponent implements OnInit {

  comments: Array<any> | undefined;
  serviceSubscribe: Subscription | undefined;
  constructor(private commentService: CommentsService) { }

  ngOnInit(): void {
    this.serviceSubscribe = this.commentService.getAllComments(this.postId)
      .subscribe(
        (result) => {
          this.comments = [...result];
        });
  }

  @Input() postId!: number


  commentAdded(comment: string) {
    this.comments?.push({ text: comment });
  }
}
