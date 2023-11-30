import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsService } from '../../services/posts.service';
import { Observable, filter, map } from 'rxjs';
import { post } from '../../models/post.model';
import { PostCardComponent } from '../posts/post-card/post-card.component';
import { Router, RouterModule } from '@angular/router';
import { AuthenticateService } from '../../services/authenticate.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PostCardComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private postService: PostsService, private authService: AuthenticateService,
    private route: Router) { }

  posts: Observable<Array<post>> | undefined;
  ngOnInit(): void {
    this.posts = this.postService.getAllPosts().pipe(map(response => response.data));
  }
  logout() {
    this.authService.logout().subscribe(() => {
      localStorage.clear();
      this.route.navigateByUrl('/login');

    })
  }
}
