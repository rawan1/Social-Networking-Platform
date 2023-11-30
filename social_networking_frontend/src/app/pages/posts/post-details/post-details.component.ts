import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsService } from '../../../services/posts.service';
import { post } from '../../../models/post.model';
import { PostCardComponent } from '../post-card/post-card.component';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [CommonModule, PostCardComponent],
  encapsulation: ViewEncapsulation.None,
  template: `<div class="container col-4 "> 
  <app-post-card [post]="postDetails" [isDetailsView]="true" *ngIf="postDetails"/>
  </div>
  `,
  styleUrl: './post-details.component.css'
})
export class PostDetailsComponent implements OnInit {

  postId: number | undefined;
  constructor(private postService: PostsService, private route: ActivatedRoute,) {
    this.postId = Number(this.route.snapshot.paramMap.get('id') ?? -1);

  }

  postDetails: post | undefined;
  ngOnInit(): void {
    if (this.postId)
      this.postService.getPostById(this.postId).subscribe((result) => this.postDetails = result.data);
  }
}
