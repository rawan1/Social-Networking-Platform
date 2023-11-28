import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PostCardComponent } from './post-card/post-card.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PostCardComponent],
  template: `<app-post-card/>`,
})
export class PostsComponent {

}
