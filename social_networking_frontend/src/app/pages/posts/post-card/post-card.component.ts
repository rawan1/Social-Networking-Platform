import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { post } from '../../../models/post.model';
import { ImgUrlPipe } from '../../../pipes/img-url.pipe';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule, ImgUrlPipe],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css'
})
export class PostCardComponent implements OnInit {
  @Input()
  post!: post;


  ngOnInit(): void {
    console.log(this.post)
  }


  likePressed() {

  }
  commentPressed() {

  }
}
