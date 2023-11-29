import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../../../services/posts.service';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription, catchError, map } from 'rxjs';
import { post } from '../../../models/post.model';

@Component({
  selector: 'app-create-edit-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-edit-post.component.html',
  styleUrl: './create-edit-post.component.css'
})
export class CreateEditPostComponent implements OnInit, OnDestroy {

  postId: number = -1;
  mode: string = 'create';
  imagePrev: any = null;
  imageFile: any;
  error: any;
  serviceSubscribe: Subscription | undefined;
  postForm = this.formBuilder.group({
    title: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]),
    description: new FormControl('', [Validators.minLength(10)]),
    tags: new FormControl(''),
  });
  constructor(private route: ActivatedRoute,
    private postService: PostsService,
    public formBuilder: FormBuilder,
    private router: Router) {
    this.postId = Number(this.route.snapshot.paramMap.get('id') ?? -1);
  }
  ngOnDestroy(): void {
    this.serviceSubscribe?.unsubscribe();
  }
  ngOnInit() {
    if (this.postId !== -1) {
      this.mode = 'edit';
      this.postService.getPostById(this.postId).pipe(map(response => response.data))
        .subscribe((postData) => {
          this.postForm.setValue({
            title: postData.title,
            description: postData.description,
            tags: postData.tags
          });
        });
    }
  }
  get f() {
    return this.postForm.controls;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file.length === 0)
      return;
    const mimeType = file.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.imagePrev = reader.result;

    };
    this.imageFile = file;
  }
  deleteImg() {
    this.imageFile = null;
    this.imagePrev = null;
  }
  submit() {
    const formData = new FormData();
    formData.append("image", this.imageFile);
    formData.append('details', JSON.stringify(this.postForm.value));
    this.serviceSubscribe = this.postService.createPost(formData).pipe(
      catchError(async (e) => this.error = e.error,
      ),
    ).subscribe((r) => {
      if (r !== 'Invalid input') {
        this.router.navigate(['./'])
      }
    });
  }



}
