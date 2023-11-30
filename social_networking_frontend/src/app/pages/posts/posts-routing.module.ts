import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './posts.component';
import { CreateEditPostComponent } from './create-edit-post/create-edit-post.component';
import { PostDetailsComponent } from './post-details/post-details.component';

const routes: Routes = [
  {
    path: '',
    component: PostsComponent,
    children: [
      {
        path: 'create',
        component: CreateEditPostComponent,
      },
      {
        path: 'edit/:id',
        component: CreateEditPostComponent,
      },{
        path: 'post-details/:id',
        component: PostDetailsComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
